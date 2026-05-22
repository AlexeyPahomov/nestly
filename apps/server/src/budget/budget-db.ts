import type { Prisma } from '../generated/prisma/client';
import type { PrismaService } from '../prisma/prisma.service';

/** Клиент БД вне интерактивной транзакции (Supabase pooler :6543 её не поддерживает). */
export type BudgetDbClient = Prisma.TransactionClient | PrismaService;
