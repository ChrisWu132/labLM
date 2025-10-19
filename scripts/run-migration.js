/**
 * Migration Runner Script
 * Purpose: Run database migrations for admin panel
 * Run: node scripts/run-migration.js
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('   Needed: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

// Use service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function runMigration() {
  console.log('🚀 Running Admin Panel Migration...\n')

  try {
    // Read migration file
    const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20251018000000_admin_panel_mvp.sql')

    if (!fs.existsSync(migrationPath)) {
      console.error('❌ Migration file not found:', migrationPath)
      process.exit(1)
    }

    const migrationSQL = fs.readFileSync(migrationPath, 'utf8')
    console.log('📄 Migration file loaded\n')

    // Execute migration using raw SQL
    // Note: We need to execute each statement separately
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))

    console.log(`📝 Executing ${statements.length} SQL statements...\n`)

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      if (statement) {
        console.log(`[${i + 1}/${statements.length}] Executing...`)

        try {
          // Use RPC to execute raw SQL (requires a database function)
          // For now, we'll use a simpler approach via the Supabase API
          const { error } = await supabase.rpc('exec_sql', { sql: statement })

          if (error) {
            // If exec_sql doesn't exist, we need to run migrations via Supabase CLI
            console.log('⚠️  Cannot execute raw SQL via Supabase API')
            console.log('📌 Please run migrations using Supabase CLI:')
            console.log('   supabase db push')
            console.log('\n   OR manually execute the migration in Supabase Dashboard:')
            console.log(`   ${migrationPath}`)
            process.exit(1)
          }

          console.log('✅ Statement executed successfully')
        } catch (err) {
          console.error('❌ Error executing statement:', err.message)
          throw err
        }
      }
    }

    console.log('\n✅ Migration completed successfully!')
    console.log('\n📊 Created tables:')
    console.log('   - classes')
    console.log('   - class_enrollments')
    console.log('\n🔒 RLS policies enabled')
    console.log('\n✅ Admin panel database is ready!')

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message)
    console.log('\n📌 Please manually run the migration:')
    console.log('   1. Open Supabase Dashboard > SQL Editor')
    console.log('   2. Paste contents of: supabase/migrations/20251018000000_admin_panel_mvp.sql')
    console.log('   3. Click "Run"')
    process.exit(1)
  }
}

// Run migration
runMigration()
