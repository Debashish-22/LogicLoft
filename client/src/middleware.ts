import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import verifyServer from "./utils/verifyServer";

const protectedRoutes = ["/account", "/account/devices", "/account/settings"];

async function middleware(req: NextRequest) {

  const absoluteURL = new URL("/", req.nextUrl.origin);
 
  try {

    if(protectedRoutes.includes(req.nextUrl.pathname)) {

      const token = req.cookies.get(process.env.AUTH_TOKEN || 'APTKN');
      
      if(!token) return NextResponse.redirect(absoluteURL.toString());

      const response = await verifyServer(token.value);

      const { success } = response;

      if (!success) {

        const res =  NextResponse.redirect(absoluteURL.toString());

        res.cookies.set(process.env.AUTH_TOKEN || 'APTKN', '', { maxAge: 0 });
        res.cookies.set(process.env.AUTH_TOKEN || 'APTKN', '', { maxAge: 0, domain: process.env.APP_DOMAIN });

        res.cookies.set(process.env.DEVICE_TOKEN || 'APDID', '', { maxAge: 0 });
        res.cookies.set(process.env.DEVICE_TOKEN || 'APDID', '', { maxAge: 0, domain: process.env.APP_DOMAIN });

        return res;
      }

      return NextResponse.next();
    }
    
  } catch (error) {

    console.log(error)
    return NextResponse.redirect(absoluteURL.toString());
  }  
}

export default middleware;