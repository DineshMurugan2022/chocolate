import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';
import type { Product } from '@/types';

export const useProducts = () => {
  const { 
    data: products = [], 
    isLoading: loading, 
    error, 
    refetch 
  } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await api.get('/products');
      return res.data;
    }
  });

  const errorMessage = error instanceof Error ? error.message : error ? 'Failed to fetch products' : null;

  return { products, loading, error: errorMessage, refetch };
};
