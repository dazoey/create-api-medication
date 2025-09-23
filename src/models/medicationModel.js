import { supabase } from "../config/supabaseClient.js";

export const MedicationModel = {
  async getAll(filters = {}) {
    let query = supabase
      .from("medications")
      .select(
        "id, sku, name, description, price, quantity, category_id, supplier_id",
        { count: 'exact' }
      );

    if (filters.name) {
      query = query.ilike('name', `%${filters.name}%`);
    }

    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 10;
    const offset = (page - 1) * limit;

    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    
    if (error) throw error;
    
    return {
      data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    };
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("medications")
      .select(
        `
        id, sku, name, description, price, quantity,
        categories ( id, name ),
        suppliers ( id, name, email, phone ),
      `
      )
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(payload) {
    if (payload.quantity < 0) {
      throw new Error("Jumlah tidak bisa kurang dari 0");
    }
    if (payload.price < 0) {
      throw new Error("Harga tidak bisa kurang dari 0");
    }

    const { data, error } = await supabase
      .from("medications")
      .insert([payload])
      .select();
    if (error) throw error;
    return data[0];
  },

  async update(id, payload) {
    if (payload.quantity !== undefined && payload.quantity < 0) {
      throw new Error("Jumlah tidak bisa kurang dari 0");
    }
    if (payload.price !== undefined && payload.price < 0) {
      throw new Error("Harga tidak bisa kurang dari 0");
    }

    const { data, error } = await supabase
      .from("medications")
      .update(payload)
      .eq("id", id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async remove(id) {
    const { error } = await supabase.from("medications").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  },

  async getTotalCount() {
    const { count, error } = await supabase
      .from("medications")
      .select("*", { count: 'exact', head: true });
    
    if (error) throw error;
    return count;
  },
};