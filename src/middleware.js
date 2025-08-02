import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware({
  publicRoutes: ["/"],

  afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      
      const signInUrl = new URL("/sign-in", req.url); 
      signInUrl.searchParams.set("returnBackUrl", req.url);

      return NextResponse.redirect(signInUrl);
    }

    
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
