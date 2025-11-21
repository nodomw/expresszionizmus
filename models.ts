import * as z from "zod";

export const id = z.number().nonnegative().min(0);

export const tetel = z.object({
  pazon: z.number().nonnegative(),
  razon: z.number().nonnegative(),
  db: z.number().nonnegative().min(1),
});

export const rendeles = z.object({
  razon: z.number().nonnegative(),
  vazon: z.number().nonnegative(),
  fazon: z.number().nonnegative(),
  idopont: z.date().default(new Date(Date.now())).optional(),
});

export const futar = z.object({
  fnev: z.string().nonempty().max(25),
  ftel: z.string().nonempty().max(15),
});

export const vevo = z.object({
  vnev: z.string().nonempty(),
  vcim: z.string().nonempty(),
});

export const pizza = z.object({
  pnev: z.string().nonempty().max(15),
  par: z.number().nonnegative().min(100),
});

export const order = z.object({
  tetel,
  rendeles,
});

export default { id, tetel, rendeles, futar, vevo, pizza, order };
