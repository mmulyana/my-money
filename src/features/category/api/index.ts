import { protectedProcedure } from "~/trpc/helper";

export const readAll = protectedProcedure.query(async ({ ctx }) => {
  const data = await ctx.db.category.findMany({
    where: {
      OR: [{ createdBy: ctx.session?.user.id }, { createdBy: null }],
    },
  });

  return data ?? [];
});
