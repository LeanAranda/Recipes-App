type TitleProps = {
  children: React.ReactNode;
};

export default function Title({ children }: TitleProps) {
  return (
    <h1 className="w-full text-center text-3xl font-bold bg-white text-black py-4 mb-6">
      {children}
    </h1>
  );
}