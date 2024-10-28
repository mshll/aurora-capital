function DashBoardLayout({ children, ...props }) {
  return (
    <>
      <main className='relative flex min-h-screen flex-col items-center justify-center' {...props}>
        {children}
      </main>
    </>
  );
}
export default DashBoardLayout;
