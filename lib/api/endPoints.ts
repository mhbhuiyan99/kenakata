const API = "https://api.escuelajs.co"; 

export const endPoints = {
    categories: {
        list: (limit: number) => `${API}/api/v1/categories?limit=${limit}`,
    },
    products: {
        featured: (limit: number, offset: number) => `${API}/api/v1/products?limit=${limit}&offset=${offset}`,
        detail: (id: number) => `${API}/api/v1/products/${id}`,
    }
};