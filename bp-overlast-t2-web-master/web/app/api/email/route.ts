import { Resend } from 'resend';
import {NextResponse} from "next/server";
import {welcomeEmail} from "@/app/emails/welcome";

const resend = new Resend('re_UtDVxqv6_5B7WnJJPSsU7sCzdymNTq4Tv');

export async function GET(){
     await resend.sendEmail({
        from: 'onboarding@resend.dev',
        to: 'fake@gmail.com',
        subject: 'Newsletter',
        react: welcomeEmail()
    });

    return NextResponse.json({
        status: 'ok'
    })
}