"use client"
import { Resend } from 'resend';
import {NextResponse} from "next/server";
import { contactEmail } from '@/app/emails/contact';


const resend = new Resend('re_c7XEN5Lq_5YVW7Hw6UChLrEMensvA6ZFf');

export async function POST(request: Request){
    const { name, email, description } = await request.json();

    await resend.sendEmail({
        from: 'onboarding@resend.dev',
        to: 'batinsimsek1998@gmail.com',
        subject: 'Contact',
        react: contactEmail({
            name,
            email,
            description
        })
    });

    return NextResponse.json({
        status: 'ok'
    })
}