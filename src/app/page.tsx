"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Award, Briefcase, Building, Calendar, CheckCircle, ChevronsRight, Dna, GraduationCap, Github, Languages, Linkedin, Mail, Server, Smartphone, Link as LinkIcon, ExternalLink, Router, Network, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const experiences = [
    {
        role: "BMS Network",
        company: "BDx Data Center Indonesia (PT. Netcom Scinergy Newsantara)",
        period: "Jan 2024 - Present",
        description: [
            "Create a redundant network topology using juniper and perle",
            "Create a virtual chassis for 2/3 Juniper Switches",
            "Configure all Switch (Setup Trunk, Access, LACP, ERPS, Active/Stanby)",
            "Maintenance and ensuring that the network runs well and does not loop due to human error",
            "BMS Network Settings in 4 BDX Data Center (KPPTI, TBS, TKP, JAH)",
        ],
        tech: ["Juniper", "Perle", "Aruba"]
    },
    {
        role: "Network Operations Center Engineer",
        company: "PT. Arsen Kusuma Indonesia",
        period: "2023 - Present",
        description: [
            "Daily Monitoring (The dude, Zabbix, Cacti)",
            "Device Configuration (Juniper, Cisco, Ruijie, Mikrotik, ZTE OLT, Planet, Dell EMC, Vyos, FRR, PfSense/OPNSense)",
            "Routing Protocols (BGP & OSPF)",
            "Troubleshooting L2,L3 & L4",
            "Network Maintenance & Migration",
            "Manage Service (Private Network, IP Transit, Colocation, FTTx, IPv6, QinQ)",
            "Manage Server (DNS Server “Powerdns & Bind9”, Nextcloud Storage, Mail Server Zimbra & Carbonio, Proxmox Mail Gateway)",
            "Manage virtualization (Proxmox & VMware ESXi)",
            "Project 464XLAT",
        ],
        tech: ["Mikrotik", "Cisco", "Juniper", "FTTx"]
    },
    {
        role: "Junior Network Administrator",
        company: "SMKN 1 Cibinong",
        period: "2020 - Present",
        description: [
            "Network cable management and ensuring network stability.",
            "Fiber optic installation and internet distribution.",
            "Operate PROXMOX virtualization and configure MikroTik routers (Firewall, NAT, VLAN, etc.).",
            "Provisioning Access Point using UniFi Controller & Ruijie Cloud.",
            "Network device maintenance and installation for national exams (UTBK, PAS).",
            "Network monitoring using The Dude and Zabbix with Telegram/Grafana integration.",
            "Installed and migrated UniFi controllers and set up Proxmox Backup Server.",
        ],
        tech: ["Mikrotik", "Cisco", "Ruijie", "Unifi", "Proxmox", "Zabbix", "The Dude", "Ubuntu"]
    },
    {
        role: "Network Consultant",
        company: "ETLE Jakarta - Polda Metro Jaya",
        period: "Feb - Apr 2024",
        description: [
            "Ensured network stability and prevented looping.",
            "Redesigned network topology for ETLE site distribution.",
            "Checked for duplicate IPs and resolved network issues at various sites.",
        ],
        tech: ["Mikrotik", "Hikvision"]
    },
    {
        role: "Network Consultant",
        company: "Kimia Farma",
        period: "Feb - Mar 2024",
        description: [
            "Reconfigured all Access Points, including frequency channel adjustments.",
            "Reconfigured all Switches with Trunk and Access setups.",
            "Adjusted router configurations for VLANs, IP addresses, and firewalls.",
        ],
        tech: ["Mikrotik", "Unifi"]
    },
    {
        role: "Network Operation Center",
        company: "PT. Jaya Komunikasi Indonesia",
        period: "2022 - 2023",
        description: [
            "Handled network troubleshooting, new customer installations, and 24x7 customer support.",
            "Managed core routers for 400+ active customers, including core, distribution routers, and switches.",
            "Configured Mikrotik (VPNs, VLANs, Firewall) and Cisco devices (VLAN, Trunking).",
            "Utilized monitoring tools like Zabbix, The Dude, and LibreNMS.",
            "Operated Proxmox & VMware ESXi virtualization and managed IPAM.",
        ],
        tech: ["Mikrotik", "Cisco", "The Dude", "Cacti", "Zabbix", "LibreNMS", "Proxmox", "VMWare", "IPAM"]
    },
    {
        role: "Beasiswa Bootcamp Cisco",
        company: "ID-Networkers",
        period: "Jun - Oct 2022",
        description: ["Learned CCNA topics including Switching, Routing, Wireless, and Network Automation.", "Completed labs to earn a free CCNA certification exam."],
        tech: ["Cisco", "Packet Tracer"]
    },
    {
        role: "Beasiswa Bootcamp Linux",
        company: "ID-Networkers",
        period: "Feb - Mar 2023",
        description: ["Covered Linux basics, server administration (Web, DNS, Proxy), security (IPTables, OpenSSL), and scripting.", "Final project involved automating vhost creation."],
        tech: ["Debian", "Bash", "Apache", "Bind9", "HAProxy"]
    }
];

const education = [
    {
        degree: "Network Information Systems and Applications",
        institution: "SMKN 1 Cibinong",
        period: "2019 - 2023",
    },
    {
        degree: "Universitas Indraprasta PGRI",
        institution: " ",
        period: " ",
    }
];

const certifications = [
  { name: "Cisco Certified Network Associate (CCNA)", issuer: "Cisco", link: "#" },
  { name: "Mikrotik Certified Network Associate (MTCNA)", issuer: "Mikrotik", link: "#" },
  { name: "CompTIA PenTest+", issuer: "CompTIA", link: "#" },
  { name: "NSE 1 Network Security Associate", issuer: "Fortinet", link: "#" },
  { name: "CCNA: Introduction to Networks", issuer: "Cisco", link: "#" },
  { name: "CCNA: Switching, Routing, and Wireless Essentials", issuer: "Cisco", link: "#" },
  { name: "CCNA: Enterprise Networking, Security, and Automation", issuer: "Cisco", link: "#" },
];

const achievements = [
    { name: "1st Winner Computer Networking DINAMIK#17", issuer: "Universitas Pendidikan Indonesia, Bandung", link: "#" },
    { name: "3rd Winner IT FEST Network Competition", issuer: "IDN Boarding School Indonesia, Jonggol", link: "#" },
    { name: "3rd Winner TKJ Packet Tracer Integer#4", issuer: "Universitas Pendidikan Ganesha Indonesia, Bali", link: "#" },
    { name: "3rd rank Bootcamp Cisco (CCNA)", issuer: "ID-Networkers", link: "#" }
];

const skillCategories = {
  "Cisco Networking": "VLAN, VLAN Trunk, Native VLAN, Neighbor Discovery (CDP & LLDP), Inter-VLAN, STP, PVSTP, RSTP, Portfast, BPDU Guard, Port Security, VTP, Etherchannel PAgP/LACP, IGP, Static Route, EIGRP, OSPF, RIP, Redistribution, NAT, PAT, FHRP, Standard ACL, Extended ACL, GRE Tunnel, DHCP, Telnet, SSH, NTP, Port Mirroring, QinQ Tunnel",
  "Mikrotik Networking": "Basic Cofiguration, DHCP, NAT, Static Routing, Firewall Filter, Tunnel (PPTP, L2TP, SSTP, OpenVPN, EoIP, IPIP), PPPoE, Limit Bandwith, Wireless, Bridging, SSH, Telnet, NTP, VLAN, Bonding, Mangel, Fail Over, Load Balance (ECMP, PCC), Auto Backup Config to Email, Hotspot, BGP/OSPF",
  "Juniper Networking": "Basic Cofiguration, VLAN, Inter-VLAN, LACP, ERPS (Ring Network), Port Mirroring, QinQ Tunnel, Auto Backup Config, Limit Bandwith",
  "Monitoring": "The Dude, MRTG Cacti, Zabbix, Observium, LibreNMS",
  "System": "FTP Server, Web server, DHCP Server, DNS Server with Bind9, SSH, LAMPP (Apache, MySQL/MariaDB, PHP), Load Balancer (HAProxy), Proxy Server (Squid), Samba, Crontab, IPTables, Bash Scripting, Deploy Laravel, Proxmox, Mail Server (Zimbra & Carbonio), Proxmox Mail Gateway, Radius",
  "Others": "Vyos, FRR, IPv6, Ruijie, Ubiquiti, Perle, FTTX, OLT, TP-Link"
};


export default function CrateCvPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    console.log(values);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <main className="container mx-auto max-w-6xl px-4 py-8 md:py-16">
        <header className="mb-12 flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-8">
          <Avatar className="h-28 w-28 md:h-32 md:w-32 border-4 border-primary shadow-lg">
            <AvatarImage src="/photo.png" alt="Muhamad Rafli Maulana Rizki" />
            <AvatarFallback>MRMR</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="font-headline text-3xl md:text-5xl font-bold text-primary">
              Muhamad Rafli Maulana Rizki
            </h1>
            <p className="mt-2 text-base md:text-lg text-muted-foreground">
              Network Engineer | Network Administrator | Network Operations Center
            </p>
            <div className="mt-4 flex flex-col sm:flex-row sm:justify-center md:justify-start items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <a href="mailto:raflimaulanarizki8@gmail.com" className="flex items-center gap-2 hover:text-primary"><Mail className="h-4 w-4" /> raflimaulanarizki8@gmail.com</a>
              <a href="https://linkedin.com/in/raflimaulanarizki" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary"><Linkedin className="h-4 w-4" /> raflimaulanarizki</a>
              <a href="https://github.com/raflimaulana" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary"><Github className="h-4 w-4" /> raflimaulana</a>
            </div>
          </div>
        </header>

        <div className="space-y-12">

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl md:text-3xl flex items-center gap-3"><Dna className="text-primary"/> Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base leading-relaxed">
                My name is Rafli, I graduated from the network information systems and applications in 2023. I have a character who always wants to try new things, and always tries to work hard and is responsible for maximizing what I do. Able to work with a team or individually. very easy to socialize.
              </p>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="font-headline text-xl flex items-center gap-2"><GraduationCap className="text-primary h-5 w-5"/> Education</CardTitle>
                </CardHeader>
                <CardContent>
                  {education.map((edu, index) => (
                    <div key={index} className={index < education.length - 1 ? "mb-3 border-b pb-3 border-border/50" : ""}>
                      <p className="font-semibold text-sm md:text-base">{edu.degree}</p>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      <p className="text-xs text-muted-foreground">{edu.period}</p>
                    </div>
                  ))}
                </CardContent>
            </Card>
            <Card className="shadow-lg">
                <CardHeader className="pb-2">
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><Languages className="text-primary h-5 w-5"/> Languages</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-start gap-3">
                      <ChevronsRight className="h-4 w-4 text-primary mt-1 shrink-0"/>
                      <div>
                          <p className="font-semibold text-sm md:text-base">English</p>
                          <p className="text-sm text-muted-foreground">Professional Working Proficiency</p>
                      </div>
                    </div>
                </CardContent>
            </Card>
          </div>

          <Card id="experience" className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl md:text-3xl flex items-center gap-3"><Briefcase className="text-primary"/> Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {experiences.map((exp, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="hover:no-underline text-left">
                      <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                        <div className="flex-1 mb-2 md:mb-0">
                          <p className="text-primary font-semibold text-base md:text-lg">{exp.role}</p>
                          <p className="text-sm font-normal text-muted-foreground flex items-center gap-2 mt-1">
                            <Building className="h-4 w-4" /> {exp.company}
                          </p>
                        </div>
                        <div className="text-sm font-normal text-muted-foreground flex items-center gap-2">
                          <Calendar className="h-4 w-4" /> {exp.period}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc space-y-2 pl-6 text-sm md:text-base mb-4">
                        {exp.description.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
                      </ul>
                       <div className="flex flex-wrap gap-2">
                            {exp.tech.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
                        </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
          
          <Card id="skills" className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl md:text-3xl flex items-center gap-3"><ShieldCheck className="text-primary"/> Technical Skills</CardTitle>
              </CardHeader>
              <CardContent>
                 <Accordion type="multiple" className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    {Object.entries(skillCategories).map(([category, skills], index) => (
                      <AccordionItem key={index} value={`skill-item-${index}`}>
                        <AccordionTrigger className="text-base md:text-lg font-semibold text-left">{category}</AccordionTrigger>
                        <AccordionContent>
                            <p className="text-sm text-muted-foreground whitespace-pre-line">{skills}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
              </CardContent>
          </Card>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card id="achievements" className="shadow-lg">
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl md:text-3xl flex items-center gap-3"><Award className="text-primary" /> Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <ul className="space-y-3">
                          {achievements.map((ach, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <Star className="h-5 w-5 text-primary mt-1 shrink-0"/>
                                <div>
                                  <a href={ach.link} target="_blank" rel="noopener noreferrer" className="group font-semibold hover:text-primary hover:underline">
                                    <p className="font-semibold text-sm md:text-base">{ach.name}
                                      <ExternalLink className="inline-block h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                    </p>
                                  </a>
                                  <p className="text-sm text-muted-foreground">{ach.issuer}</p>
                                </div>
                              </li>
                          ))}
                      </ul>
                  </CardContent>
              </Card>
              <Card id="certifications" className="shadow-lg">
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl md:text-3xl flex items-center gap-3"><CheckCircle className="text-primary" /> Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                        {certifications.map((cert, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <ChevronsRight className="h-4 w-4 text-primary mt-1 shrink-0"/>
                              <div>
                                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="group font-semibold hover:text-primary hover:underline">
                                      <span className="text-sm md:text-base">{cert.name}</span>
                                      <ExternalLink className="inline-block h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                  </a>
                                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                              </div>
                            </li>
                        ))}
                    </ul>
                  </CardContent>
              </Card>
          </div>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl md:text-3xl">Badges</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row flex-wrap gap-4 items-center">
              <a href="https://holopin.io/@raflimaulanarizki" target="_blank" rel="noopener noreferrer">
                <img src="https://holopin.me/raflimaulanarizki" alt="An image of @raflimaulanarizki's Holopin badges, which is a link to view their full Holopin profile" className="w-full max-w-xs sm:max-w-sm md:max-w-md"/>
              </a>
              <a href="https://ipv6.he.net/certification/" target="_blank" rel="noopener noreferrer">
                <img src="https://ipv6.he.net/certification/create_badge.php?pass_name=raflimaulanarizki&badge=2" alt="IPv6 Certification Badge" />
              </a>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="mt-16 border-t border-border/50 py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Muhamad Rafli Maulana Rizki. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="https://www.linkedin.com/in/raflimaulanarizki" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
            <Link href="https://github.com/raflimaulana" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
            <a href="mailto:raflimaulanarizki8@gmail.com" aria-label="Mail">
              <Mail className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
