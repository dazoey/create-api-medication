import { supabase } from "../config/supabaseClient.js";

export const MedicationModel = {
  async getAll({ name, page, limit }) {
    let query = supabase
      .from("medications")
      .select("id, sku, name, description, price, quantity, category_id, supplier_id", { count: "exact" });

    // pencarian
    if (name) {
      query = query.ilike("name", `%${name}%`);
    }

    // pagination
    if (page && limit) {
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;
    if (error) throw error;

    return { data, total: count };
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("medications")
      .select(
        `
        id, sku, name, description, price, quantity,
        categories ( id, name ),
        suppliers ( id, name, email, phone )
      `
      )
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(payload) {
    // validasi stok & harga
    if (payload.price < 0) throw new Error("Price tidak boleh kurang dari 0");
    if (payload.quantity < 0) throw new Error("Quantity tidak boleh kurang dari 0");

    const { data, error } = await supabase.from("medications").insert([payload]).select();
    if (error) throw error;
    return data[0];
  },

  async update(id, payload) {
    // validasi stok & harga
    if (payload.price !== undefined && payload.price < 0) throw new Error("Price tidak boleh kurang dari 0");
    if (payload.quantity !== undefined && payload.quantity < 0) throw new Error("Quantity tidak boleh kurang dari 0");

    const { data, error } = await supabase.from("medications").update(payload).eq("id", id).select();
    if (error) throw error;
    return data[0];
  },

  async remove(id) {
    const { error } = await supabase.from("medications").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  },

  async getTotal() {
    const { count, error } = await supabase.from("medications").select("*", { count: "exact", head: true });
    if (error) throw error;
    return count;
  },
};
