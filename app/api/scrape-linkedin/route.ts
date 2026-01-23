import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const requestSchema = z.object({
  linkedin_url: z.string().url()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { linkedin_url } = requestSchema.parse(body)

    const apifyToken = process.env.APIFY_API_TOKEN
    
    if (!apifyToken) {
      console.error('APIFY_API_TOKEN manquant')
      return NextResponse.json({ 
        success: false, 
        error: 'Configuration Apify manquante'
      }, { status: 500 })
    }

    // Actor Apify pour scraper un profil LinkedIn
    const ACTOR_ID = 'harvestapi~linkedin-profile-scraper'
    
    const response = await fetch(
      `https://api.apify.com/v2/acts/${ACTOR_ID}/run-sync-get-dataset-items?token=${apifyToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          urls: [linkedin_url]
        })
      }
    )

    if (!response.ok) {
      console.error('Apify error:', response.status, await response.text())
      return NextResponse.json({ 
        success: false, 
        error: 'Erreur lors du scraping LinkedIn'
      }, { status: 500 })
    }

    const data = await response.json()
    
    if (!data || data.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Profil LinkedIn non trouvé ou privé'
      }, { status: 404 })
    }

    const profile = data[0]

    // Mapper les données vers notre format
    return NextResponse.json({
      success: true,
      profile: {
        full_name: profile.fullName || profile.name || '',
        headline: profile.headline || profile.title || '',
        summary: profile.summary || profile.about || '',
        location: profile.location || '',
        experiences: (profile.experience || profile.positions || []).slice(0, 5).map((exp: any) => ({
          title: exp.title || '',
          company: exp.companyName || exp.company || '',
          duration: exp.duration || exp.timePeriod || '',
          description: exp.description || ''
        })),
        education: (profile.education || []).slice(0, 3).map((edu: any) => ({
          school: edu.schoolName || edu.school || '',
          degree: edu.degree || '',
          field: edu.fieldOfStudy || edu.field || ''
        })),
        skills: (profile.skills || []).slice(0, 10)
      }
    })

  } catch (error) {
    console.error('Scraping error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Erreur serveur lors du scraping'
    }, { status: 500 })
  }
}
