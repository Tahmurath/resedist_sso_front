import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  email: z.string().min(6, { message: "Email is required" }).email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // تابع برای ارسال توکن یا کد موقت به صفحه والد
  const sendTokenToParent = async (data: { access_token?: string; code?: string }) => {
    const parentOrigin = "https://your-app-domain.com"; // دامنه صفحه والد
    // بررسی iframe یا پاپ‌آپ
    if (window.parent !== window || window.opener) {
      try {
        // استفاده از window.parent برای iframe یا window.opener برای پاپ‌آپ
        const targetWindow = window.parent !== window ? window.parent : window.opener;
        if (targetWindow) {
          targetWindow.postMessage({ access_token: data.access_token }, parentOrigin);
          // در iframe، نمی‌تونیم پنجره رو ببندیم، اما می‌تونیم فرم رو مخفی کنیم
          if (window.parent !== window) {
            setIsAuthenticated(true); // مخفی کردن فرم در iframe
          } else {
            window.close(); // بستن پاپ‌آپ
          }
        }
      } catch (error) {
        console.error("Failed to send postMessage:", error);
        toast(t("login.error"), {
          description: t("login.message_error"),
        });
        await redirectWithCode(data.code); // Fallback به ریدایرکت با کد
      }
    } else {
      await redirectWithCode(data.code);
    }
  };

  // تابع برای ریدایرکت با کد موقت
  const redirectWithCode = async (code?: string) => {
    const redirectUrl = new URLSearchParams(window.location.search).get("redirect");
    if (redirectUrl && code) {
      try {
        const url = new URL(redirectUrl);
        const allowedDomains = ["localhost", "your-app-domain.com"];
        if (!allowedDomains.includes(url.hostname)) {
          throw new Error("Invalid redirect domain");
        }
        url.searchParams.set("code", code);
        window.location.href = url.toString();
      } catch (error) {
        console.error("Invalid redirect URL:", error);
        toast(t("login.error"), {
          description: t("login.invalid_redirect"),
        });
      }
    } else {
      console.error("No redirect URL or code found");
      toast(t("login.error"), {
        description: t("login.no_redirect"),
      });
    }
  };

  // بررسی وضعیت لاگین با درخواست به /refresh
  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.post(
          "/api/v1/sso/auth/refresh",
          {},
          { withCredentials: true }
        );
        if (response.data._status === "success" && response.data.data.access_token) {
          setIsAuthenticated(true);
          sendTokenToParent({
            access_token: response.data.data.access_token,
            code: response.data.data.code, // فرض می‌کنیم سرور کد موقت هم برمی‌گردونه
          });
        }
      } catch (error: any) {
        setIsAuthenticated(false);
        console.error("Refresh token failed:", error);
        alert("Refresh token failed:" + error);
        if (error.response?.status !== 401) {
          toast(t("login.error"), {
            description: t("login.error_message"),
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [t]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/v1/sso/auth/login",
        data,
        { withCredentials: true }
      );
      if (response.data._status === "success" && response.data.data.access_token) {
        toast(t("login.success"), {
          description: t("login.success_message"),
        });
        sendTokenToParent({
          access_token: response.data.data.access_token,
          code: response.data.data.code, // فرض می‌کنیم سرور کد موقت هم برمی‌گردونه
        });
      } else {
        toast(t("login.error"), {
          description: t("login.invalid_credentials"),
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.status === 401
          ? t("login.invalid_credentials")
          : t("login.error_message");
      toast(t("login.error"), {
        description: errorMessage,
      });
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isAuthenticated) {
    return null; // مخفی کردن فرم بعد از لاگین موفق در iframe یا پاپ‌آپ
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t("login.welcome_back")}</CardTitle>
          <CardDescription>{t("login.social_login_description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" disabled={isLoading}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-5 w-5">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  {t("login.apple")}
                </Button>
                <Button variant="outline" className="w-full" disabled={isLoading}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-5 w-5">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  {t("login.google")}
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  {t("login.or_continue_with")}
                </span>
              </div>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("login.email")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("login.email_placeholder")} disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>{t("login.password")}</FormLabel>
                        <a
                          href="#"
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          {t("login.forgot_password")}
                        </a>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t("login.password_placeholder")}
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("login.loading")}
                    </>
                  ) : (
                    t("login.submit")
                  )}
                </Button>
              </div>
              <div className="text-center text-sm">
                {t("login.no_account")}{" "}
                <NavLink to="/signup" className="underline underline-offset-4">
                  {t("site.signup")}
                </NavLink>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        {t("login.terms_privacy")}{" "}
        <a href="#">{t("login.terms_of_service")}</a>{" "}
        {t("login.and")}{" "}
        <a href="#">{t("login.privacy_policy")}</a>.
      </div>
    </div>
  );
}