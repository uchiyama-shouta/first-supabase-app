import type { ReactNode, VFC } from "react";
import { Auth, Button, IconLogOut } from "@supabase/ui";
import { Header } from "src/component/ui/Header";
import { Footer } from "src/component/ui/Footer";
import { client } from "src/lib/supabase";
import { LayoutErrorBoundary } from "src/component/ui/Layout/LayoutErrorBoundary";

type Props = {
  children: ReactNode;
};

export const AuthLayout: VFC<Props> = (props) => {
  const { user } = Auth.useUser();

  const handleSignOut = () => client.auth.signOut();

  return (
    <div className="bg-gray-300">
      <div className="container grid mx-auto min-h-screen grid-rows-[auto,1fr,auto]">
        <Header />
        <main className="px-4 text-gray-600 bg-gray-100">
          <LayoutErrorBoundary>
            {user ? (
              <div>
                <div>{props.children}</div>
                <div className="flex justify-end my-4 mx-2">
                  <Button
                    size="medium"
                    icon={<IconLogOut />}
                    onClick={handleSignOut}
                  >
                    Sign out
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center pt-8">
                <div className="w-full sm:w-96">
                  <Auth
                    supabaseClient={client}
                    providers={["github"]}
                    socialColors={true}
                  />
                </div>
              </div>
            )}
          </LayoutErrorBoundary>
        </main>
        <Footer />
      </div>
    </div>
  );
};
