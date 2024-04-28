import { cn } from "@/lib/utils";

export const Logo = ({className}: {className?:  string}) => {
  return (
    <div>
      <h4 className={cn('', className)} style={{ fontFamily: 'Caramel, sans-serif', color:'#ff0783' }}>AF</h4>
    </div>
  );
};
