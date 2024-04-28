
export const Success = ({ message }: { message: string }) => {


  return (
    <div className=' absolute left-1/2 transform -translate-x-1/2 top-5 z-50 w-64 h-8 border border-green-800 rounded-md text-green-700 font-semibold text-md backdrop-blur-lg flex items-center justify-center '>
      <p>{message}</p>
    </div>
  );
};