export const generateSlug = (text: string): string =>{
  return text
    .normalize("NFD")
    .replace(/[\u0300-\036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}