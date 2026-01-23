import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const requestSchema = z.object({
  email: z.string().email(),
  first_name: z.string(),
  linkedin_url: z.string().optional(),
  linkedin_data: z.any().optional(),
  quiz_answers: z.any(),
  diagnostic: z.any()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = requestSchema.parse(body)

    console.log('=== SAVE-RESULT DATA ===')
    console.log('Email reçu:', data.email)
    console.log('First name reçu:', data.first_name)
    console.log('=========================')

    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', data.email)
      .single()

    let userId: string

    if (existingUser) {
      userId = existingUser.id
    } else {
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert({
          email: data.email,
          first_name: data.first_name,
          linkedin_url: data.linkedin_url || null
        })
        .select('id')
        .single()

      if (userError) throw userError
      userId = newUser.id
    }

    const { data: diagnostic, error: diagnosticError } = await supabase
      .from('diagnostics')
      .insert({
        user_id: userId,
        linkedin_data: data.linkedin_data || null,
        quiz_answers: data.quiz_answers,
        archetype: data.diagnostic.archetype,
        score: data.diagnostic.score,
        score_breakdown: data.diagnostic.score_breakdown,
        diagnostic_json: data.diagnostic
      })
      .select('id')
      .single()

    if (diagnosticError) throw diagnosticError

    // Envoyer le contact à Systeme.io via l'API officielle
    try {
      const systemeResponse = await fetch('https://api.systeme.io/api/contacts', {
        method: 'POST',
        headers: {
          'X-API-Key': process.env.SYSTEME_API_KEY!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          locale: 'fr',
          fields: [
            { slug: 'first_name', value: data.first_name || '' }
          ]
        })
      })
      
      console.log('=== SYSTEME.IO API ===')
      console.log('Status:', systemeResponse.status)
      
      if (systemeResponse.ok) {
        const contactData = await systemeResponse.json()
        const contactId = contactData.id
        console.log('Contact créé, ID:', contactId)
        
        // Ajouter le tag "diagnostic-brutal" pour déclencher le workflow
        const tagId = process.env.SYSTEME_TAG_DIAGNOSTIC_ID!
        console.log('Tag ID utilisé:', tagId, 'Type:', typeof tagId)

        const tagResponse = await fetch(`https://api.systeme.io/api/contacts/${contactId}/tags`, {
          method: 'POST',
          headers: {
            'X-API-Key': process.env.SYSTEME_API_KEY!,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tagId: parseInt(tagId)  // Convertir en nombre
          })
        })

        console.log('Tag response status:', tagResponse.status)
        const tagResponseText = await tagResponse.text()
        console.log('Tag response body:', tagResponseText)
        
      } else {
        const errorText = await systemeResponse.text()
        console.error('Systeme.io error:', errorText)
      }
      console.log('=== END SYSTEME.IO ===')
      
    } catch (e) {
      console.error('Systeme.io API error:', e)
    }

    // Retourner l'ID pour redirection vers la page résultat
    return NextResponse.json({ 
      success: true, 
      id: diagnostic.id 
    })

  } catch (error) {
    console.error('Save result error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Erreur lors de la sauvegarde.'
    }, { status: 500 })
  }
}
