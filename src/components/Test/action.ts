'use server'

export async function create({counter}) {
    console.log(counter)
    return ({message: 'okay'})
}