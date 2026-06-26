"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { RichText } from "@/components/RichText";
import { TiltCard } from "@/components/TiltCard";
import {
  teamDepartments,
  type TeamDepartment,
} from "@/lib/site-data";
import type { TeamMemberRecord } from "@/lib/db/types";

function getInitials(member: TeamMemberRecord) {
  if (member.name.trim()) {
    return member.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  return member.role
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function TeamMemberCard({ member }: { member: TeamMemberRecord }) {
  const displayName = member.name.trim() || member.role;
  const showRole = member.name.trim().length > 0;

  return (
    <TiltCard className="group h-full overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-light">
        {member.image ? (
          <Image
            src={member.image}
            alt={displayName}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface-light via-surface to-black">
            <span className="font-display text-5xl font-bold text-foreground/10 transition-colors duration-300 group-hover:text-accent/20 lg:text-6xl">
              {getInitials(member)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent">
            {member.department}
          </span>
          <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
            {displayName}
          </h3>
          {showRole && (
            <p className="mt-1 text-sm text-muted">{member.role}</p>
          )}
        </div>
      </div>
      <div className="border-t border-border p-6">
        <RichText html={member.bio} className="text-sm text-muted" />
      </div>
    </TiltCard>
  );
}

export function TeamGrid({ members }: { members: readonly TeamMemberRecord[] }) {
  const [activeDepartment, setActiveDepartment] =
    useState<TeamDepartment>("All");

  const filteredMembers = useMemo(() => {
    if (activeDepartment === "All") return members;
    return members.filter(
      (member) => member.department === activeDepartment,
    );
  }, [activeDepartment, members]);

  return (
    <div>
      <div className="sticky top-24 z-20 -mx-6 border-b border-border bg-background/90 px-6 py-4 backdrop-blur-md lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-wrap">
          {teamDepartments.map((department) => (
            <button
              key={department}
              type="button"
              data-cursor="pointer"
              onClick={() => setActiveDepartment(department)}
              className={`shrink-0 rounded-full border px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] transition-all duration-300 ${
                activeDepartment === department
                  ? "border-accent bg-accent text-background"
                  : "border-border text-muted hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {department}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
        {filteredMembers.map((member, i) => (
          <ScrollReveal key={member.id} delay={i * 60}>
            <TeamMemberCard member={member} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
