import './style.css'
import { createClient } from '@supabase/supabase-js'

class Home { 
  constructor() {
    this.initSupabase()
    this.getData()
  }

  // Create a single supabase client for interacting with your database
  initSupabase() {
    this.supabase = createClient('https://mywwgeczkqrkuexbzqfa.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15d3dnZWN6a3Fya3VleGJ6cWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTkxOTAsImV4cCI6MjA2MTQ5NTE5MH0.ljOOmpAF9LxhlAs_rAub9sutpwrCsa1RtaFIxxj_Qp0')
  }

  async getData() {
    const valeurDeRetour = await this.supabase
    .from('Film')
    .select()

    console.log(valeurDeRetour)
  }
}

new Home();
