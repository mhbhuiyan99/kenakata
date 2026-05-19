
const API = "https://api.escuelajs.co"; 

export const endPoints = {
    categories: {
        list: (limit: number) => `${API}/api/v1/categories?limit=${limit}`,
        products: (id: number | string) => `${API}/api/v1/categories/${id}/products`,
    },
    products: {
        featured: (limit: number, offset: number) => `${API}/api/v1/products?limit=${limit}&offset=${offset}`,
        detail: (id: number | string) => `${API}/api/v1/products/${id}`,
    },
    auth: {
        login: `${API}/api/v1/auth/login`,
        signup: `${API}/api/v1/users/`,
        profile: `${API}/api/v1/auth/profile`,
    }
};