import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ruicsvrwhbupveqoismn.supabase.co'  
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1aWNzdnJ3aGJ1cHZlcW9pc21uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0NDcwOTcsImV4cCI6MjAzNDAyMzA5N30.C4-1LQtTXLpdtwDekdzbUWjZLbbFBQ7ZiQf9UAmWXbY'
export const supabase = createClient(supabaseUrl, supabaseKey)

