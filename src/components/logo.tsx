import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div>
      <h4
        className={cn("", className)}
        style={{ fontFamily: "Caramel, sans-serif", color: "#ff0783" }}
      >
        AF
      </h4>
    </div>
  );
};

export const LogoText = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(`w-8 h-8 items-center justify-center rounded-full backdrop-blur-3xl overflow-visible`, className)}
      style={{
        backgroundImage:
          "linear-gradient(45deg, rgba(255, 7, 131, 0.5), rgba(147, 0, 192, 0.5))",
      }}
    >
      <img
        src="/logo3.svg"
        alt=""
        className=" w-8 h-8 filter contrast-150 saturate-150 rounded-full "
      />
    </div>
  );
};
