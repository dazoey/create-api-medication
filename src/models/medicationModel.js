import { supabase } from "../config/supabaseClient.js";

export const MedicationModel = {
  async getAll({ name, page = 1, limit = 10 }) {
    let query = supabase.from("medications").select("*", { count: "exact" });

    if (name) {
      query = query.ilike("name", `%${name}%`);
    }

    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) throw new Error(error.message);
    return { data, count };
  },

  async getTotalMedications() {
    const { count, error } = await supabase
      .from("medications")
      .select("*", { count: "exact", head: true });

    if (error) throw new Error(error.message);
    return count;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("medications")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new Error("Medication not found");
    return data;
  },

  async create(input) {
    const { data, error } = await supabase
      .from("medications")
      .insert(input)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async update(id, input) {
    const { data, error } = await supabase
      .from("medications")
      .update(input)
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async remove(id) {
    const { error } = await supabase.from("medications").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return true;
  },
};
