import ProtectedRoute from "@/components/ProtectedRoute";

export default function RecipesLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}