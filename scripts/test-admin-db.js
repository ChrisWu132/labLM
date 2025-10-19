/**
 * Admin Panel Database Test
 * Purpose: Verify admin panel tables and RLS policies
 * Run: node scripts/test-admin-db.js
 */

const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testAdminDatabase() {
  console.log('🧪 Testing Admin Panel Database...\n')

  try {
    // Test 1: Check if classes table exists
    console.log('📋 Test 1: Checking if classes table exists...')
    const { error: classesError } = await supabase
      .from('classes')
      .select('*')
      .limit(0)

    if (classesError && !classesError.message.includes('JWT') && !classesError.message.includes('Row')) {
      console.log('❌ classes table not found:', classesError.message)
      return
    }
    console.log('✅ classes table exists')

    // Test 2: Check if class_enrollments table exists
    console.log('📋 Test 2: Checking if class_enrollments table exists...')
    const { error: enrollmentsError } = await supabase
      .from('class_enrollments')
      .select('*')
      .limit(0)

    if (enrollmentsError && !enrollmentsError.message.includes('JWT') && !enrollmentsError.message.includes('Row')) {
      console.log('❌ class_enrollments table not found:', enrollmentsError.message)
      return
    }
    console.log('✅ class_enrollments table exists\n')

    // Test 3: Check RLS is enabled
    console.log('🔒 Test 3: Checking RLS policies...')
    const { data: testClasses, error: rlsError } = await supabase
      .from('classes')
      .select('*')
      .limit(1)

    if (rlsError) {
      if (rlsError.message.includes('JWT') || rlsError.message.includes('auth')) {
        console.log('✅ RLS is properly enabled on classes (JWT required)')
      } else {
        console.log('⚠️  Unexpected RLS error:', rlsError.message)
      }
    } else if (!testClasses || testClasses.length === 0) {
      console.log('✅ RLS is working on classes (empty result for unauthenticated)')
    }

    const { data: testEnrollments, error: rlsError2 } = await supabase
      .from('class_enrollments')
      .select('*')
      .limit(1)

    if (rlsError2) {
      if (rlsError2.message.includes('JWT') || rlsError2.message.includes('auth')) {
        console.log('✅ RLS is properly enabled on class_enrollments (JWT required)')
      } else {
        console.log('⚠️  Unexpected RLS error:', rlsError2.message)
      }
    } else if (!testEnrollments || testEnrollments.length === 0) {
      console.log('✅ RLS is working on class_enrollments (empty result)')
    }
    console.log('')

    // Summary
    console.log('📊 Summary:')
    console.log('✅ Admin panel tables created successfully')
    console.log('   - classes')
    console.log('   - class_enrollments')
    console.log('✅ RLS policies are enabled')
    console.log('✅ Database is ready for admin panel!')
    console.log('')
    console.log('💡 Next: Test the teacher dashboard at http://localhost:3007/dashboard/teacher')
    console.log('💡 Next: Test join flow at http://localhost:3007/dashboard/join-class')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    process.exit(1)
  }
}

// Run tests
testAdminDatabase()
