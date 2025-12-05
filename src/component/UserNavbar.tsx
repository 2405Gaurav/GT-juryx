

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserDetails } from "@/hooks/useStore";
import { motion } from "framer-motion";
import Image from "next/image"
import {
  LayoutDashboard,
  Gavel,
  Users,
  LogOut,
  LogIn,
  Code2,
} from "lucide-react";

export default function Navbar() {
  const { user, clearUser } = useUserDetails();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- Configuration based on Role ---
  const getRoleConfig = (role: string) => {
    const normalizedRole = role.toUpperCase();
    switch (normalizedRole) {
      case "ORGANIZER":
        return {
          path: "/organizer",
          label: "Command Center",
          icon: <LayoutDashboard className="w-4 h-4" />,
          color: "text-indigo-400",
          bgColor: "bg-indigo-500/10 border-indigo-500/20",
        };
      case "PANELIST":
        return {
          path: `/event/${user?.eventId}/panelist/`,
          label: "Judging Console",
          icon: <Gavel className="w-4 h-4" />,
          color: "text-emerald-400",
          bgColor: "bg-emerald-500/10 border-emerald-500/20",
        };
      default: // USER (Participant)
        return {
          path: `/event/${user?.eventId}/user/`,
          label: "Participant Hub",
          icon: <Users className="w-4 h-4" />,
          color: "text-cyan-400",
          bgColor: "bg-cyan-500/10 border-cyan-500/20",
        };
    }
  };

  const getUserInitials = (email: string) =>
    email.substring(0, 2).toUpperCase();

  const handleLogout = () => {
    clearUser();
    router.push("/login");
  };

  const roleConfig = user && user.role ? getRoleConfig(user.role) : null;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl "
    >
      <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* LEFT: Branding */}
        <Link href="/" className="flex items-center gap-3 group">
         <div className="relative flex items-center justify-center w-9 h-9 bg-zinc-900 rounded-lg border border-white/10 group-hover:border-indigo-500/50 transition-colors overflow-hidden">
  <div className="absolute inset-0 bg-indigo-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />

  <Image
    src="/navicn.png"
    alt="JuryX Logo"
    width={28}
    height={28}
    className="w-6 h-6 object-contain"
  />
</div>

          <div className="flex flex-col">
            <span className="text-sm font-bold text-white tracking-tight leading-none">
              JURYX
            </span>
            <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
              Protocol V1
            </span>
          </div>
        </Link>

        {/* RIGHT: User Controls & Credit */}
        <div className="flex items-center gap-6">
          {/* --- DEVELOPER CREDIT BADGE --- */}
          <a
            href="https://thegauravthakur.in"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-white/5 hover:border-white/10 hover:bg-zinc-900 transition-all group"
            title="Developed by Gaurav"
          >
            <Code2 className="w-3.5 h-3.5 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wide group-hover:text-zinc-300 transition-colors">
              Dev_Op:{" "}
              <span className="font-bold text-zinc-300 group-hover:text-white">
                Gaurav
              </span>
            </span>
          </a>

          {/* Separator */}
          <div className="h-6 w-px bg-zinc-800 hidden md:block" />

          {mounted && user && roleConfig ? (
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
              {/* Role Dashboard Button */}
              <Link
                href={roleConfig.path}
                className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-bold uppercase tracking-wide transition-all hover:scale-105 active:scale-95 ${roleConfig.bgColor} ${roleConfig.color} hover:bg-opacity-20`}
              >
                {roleConfig.icon}
                <span>{roleConfig.label}</span>
              </Link>

              {/* User Profile */}
              <div className="flex items-center gap-3">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-xs font-medium text-zinc-300 font-mono">
                    {user.email}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full animate-pulse ${roleConfig.color.replace(
                        "text-",
                        "bg-"
                      )}`}
                    />
                    <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">
                      {user.role} Mode
                    </span>
                  </div>
                </div>

                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner ring-1 ring-transparent hover:ring-zinc-700 transition-all">
                  <span className="text-xs font-bold text-zinc-400 group-hover:text-white font-mono">
                    {getUserInitials(user.email)}
                  </span>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                title="Disconnect Session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            // Logged Out State
            mounted && (
              <Link
                href="/login"
                className="group flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wide hover:bg-zinc-200 transition-all"
              >
                <LogIn className="w-3 h-3" />
                <span>Connect ID</span>
              </Link>
            )
          )}
        </div>
      </div>
    </motion.nav>
  );
}
