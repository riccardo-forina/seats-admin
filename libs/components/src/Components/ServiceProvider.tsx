import { Context, createContext, PropsWithChildren, useContext } from "react";
import { getService, LicenseService } from "client";

type ServiceContextProps = {
  serviceName: string;
};

export const ServiceContext = createContext<LicenseService | undefined>(
  undefined
);

function useRequiredContext<T>(context: Context<T>): NonNullable<T> {
  const resolved = useContext(context);

  if (resolved !== undefined && resolved !== null) {
    return resolved;
  }

  throw new Error(
    `No provider found for context, make sure it is included in your component hierarchy.`
  );
}

export const useService = () => useRequiredContext(ServiceContext);

export const ServiceContextProvider = ({
  serviceName,
  children,
}: PropsWithChildren<ServiceContextProps>) => {
  return (
    <ServiceContext.Provider value={getService(serviceName)}>
      {children}
    </ServiceContext.Provider>
  );
};
