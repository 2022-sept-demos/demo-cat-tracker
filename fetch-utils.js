const SUPABASE_URL = 'https://jasyhcsqgldsmfkurobj.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imphc3loY3NxZ2xkc21ma3Vyb2JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjEyMDI0NDIsImV4cCI6MTk3Njc3ODQ0Mn0.74E0UgNsbpI3tgSt6yrAijTNHEYMC5GmoIgDrpqctB0';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

export async function createCat(cat) {
    // const response = await client.from('cats').insert(cat).single();
    // return response
    return await client.from('cats').insert(cat).single();
}

export async function getCats() {
    return await client.from('cats').select('*');
}

export async function updateLives(id, lives) {
    return await client
        .from('cats')
        .update({ lives: lives })
        .eq('id', id)
        .single();
}

export async function removeAllDeadCats() {
    return await client.from('cats').delete().lte('lives', 0);
}
