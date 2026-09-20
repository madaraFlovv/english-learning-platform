interface RegisterData {
    email:string,
    password: string,
}

export const register = async (data:RegisterData) => {
    console.log(`данные отправились на бек: ${data.email}, ${data.password}`)
}