"use client";

// import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Globe, MapPin, Shield, Zap, ArrowRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export default function Home() {
  const [serverStatus, setServerStatus] = useState<
    Record<string, { online: boolean; ping: string }>
  >({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const cardVariants = {
    hover: {
      y: -8,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const vpnLocations = [
    {
      name: "India",
      country: "🇮🇳",
      icon: MapPin,
      url: "https://vpn.in.omshejul.com/",
      description: "Connect to Mumbai",
      serverId: "in",
    },
    {
      name: "United States",
      country: "🇺🇸",
      icon: Shield,
      url: "https://vpn.us.omshejul.com/",
      description: "Connect to New Jersey",
      serverId: "us",
    },
    {
      name: "European Union",
      country: "🇪🇺",
      icon: Globe,
      url: "https://vpn.eu.omshejul.com/",
      description: "Connect to Germany",
      serverId: "eu",
    },
  ];

  // Function to ping a server once
  const pingServer = async (
    url: string
  ): Promise<{ online: boolean; pingTime: number }> => {
    try {
      const startTime = performance.now();
      await fetch(url, {
        method: "HEAD",
        mode: "no-cors",
        cache: "no-cache",
      });
      const endTime = performance.now();
      const pingTime = Math.round(endTime - startTime);

      return { online: true, pingTime };
    } catch {
      // Even if CORS blocks the request, we can measure the time to connection attempt
      try {
        const startTime = performance.now();
        await fetch(url, { method: "HEAD", mode: "no-cors" });
        const endTime = performance.now();
        const pingTime = Math.round(endTime - startTime);

        return { online: true, pingTime };
      } catch {
        return { online: false, pingTime: 0 };
      }
    }
  };

  // Function to check server status with single ping
  const checkServerStatus = useCallback(
    async (url: string, serverId: string) => {
      const pingResult = await pingServer(url);

      if (pingResult.online) {
        setServerStatus((prev) => ({
          ...prev,
          [serverId]: {
            online: true,
            ping: `${pingResult.pingTime}ms`,
          },
        }));
      } else {
        setServerStatus((prev) => ({
          ...prev,
          [serverId]: {
            online: false,
            ping: "Offline",
          },
        }));
      }
    },
    []
  );

  // Check if device is mobile and track mouse position
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  // Check all servers on component mount
  useEffect(() => {
    vpnLocations.forEach((location) => {
      checkServerStatus(location.url, location.serverId);
    });

    // Refresh status every 5 seconds
    const interval = setInterval(() => {
      vpnLocations.forEach((location) => {
        checkServerStatus(location.url, location.serverId);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [checkServerStatus]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-orange-100/30 to-orange-200/20 rounded-full blur-3xl"
          style={{ top: "10%", left: "10%" }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"
          style={{ top: "60%", right: "15%" }}
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-r from-green-100/15 to-emerald-100/25 rounded-full blur-3xl"
          style={{ bottom: "20%", left: "20%" }}
          animate={{
            x: [0, 50, 0],
            y: [0, -40, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-300/40 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 12}%`,
            }}
            animate={{
              y: [-10, -30, -10],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Subtle Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
               linear-gradient(90deg, #000 1px, transparent 1px),
               linear-gradient(180deg, #000 1px, transparent 1px)
             `,
            backgroundSize: "60px 60px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "60px 60px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Mouse Follower Elements - Desktop Only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute w-64 h-64 bg-gradient-to-r from-orange-200/10 to-orange-300/5 rounded-full blur-2xl"
              animate={{
                x: mousePosition.x - 128,
                y: mousePosition.y - 128,
              }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 30,
              }}
            />
            <motion.div
              className="absolute w-32 h-32 bg-gradient-to-r from-blue-200/15 to-purple-200/10 rounded-full blur-xl"
              animate={{
                x: mousePosition.x - 64,
                y: mousePosition.y - 64,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 25,
              }}
            />
            <motion.div
              className="absolute w-4 h-4 bg-orange-400/30 rounded-full blur-sm"
              animate={{
                x: mousePosition.x - 8,
                y: mousePosition.y - 8,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            />
          </>
        )}
      </div>

      {/* Header */}
      <motion.div
        className="container mx-auto px-4 py-6 md:py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-8 md:mb-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SecureVPN</span>
          </div>
          <div className="text-sm text-gray-600"></div>
        </div>

        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <motion.div
            className="text-center mb-8 md:mb-16"
            variants={itemVariants}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
              Connect to the world
              <span className="block text-orange-500">securely</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8 px-4">
              Choose your preferred server location and experience blazing-fast,
              secure internet browsing with military-grade encryption.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              {Object.keys(serverStatus).length === 0
                ? "Checking server status..."
                : Object.keys(serverStatus).length < vpnLocations.length
                ? `Checking servers... (${Object.keys(serverStatus).length}/${
                    vpnLocations.length
                  })`
                : `All servers checked - ${
                    Object.values(serverStatus).filter((s) => s.online).length
                  } online`}
            </div>
          </motion.div>

          {/* VPN Location Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-16"
            variants={itemVariants}
          >
            {vpnLocations.map((location) => {
              const status = serverStatus[location.serverId];
              const isOnline = status?.online ?? false;
              const pingTime = status?.ping ?? "Checking...";

              return (
                <motion.div
                  key={location.name}
                  variants={cardVariants}
                  whileHover={!isMobile ? "hover" : undefined}
                  className="group cursor-pointer"
                  onClick={() => (window.location.href = location.url)}
                >
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden h-48 flex flex-col hover:border-orange-200 hover:shadow-xl md:hover:border-orange-200 md:hover:shadow-xl">
                    {/* Orange accent line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600"></div>

                    {/* Status indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            isOnline ? "bg-green-500" : "bg-red-500"
                          } ${!status ? "animate-pulse" : ""}`}
                        ></div>
                        <span
                          className={`text-sm font-medium ${
                            isOnline ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {!status
                            ? "Checking..."
                            : isOnline
                            ? "Online"
                            : "Offline"}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 font-mono">
                        {pingTime}
                      </span>
                    </div>

                    {/* Location info */}
                    <div className="flex items-center gap-3 mb-4 flex-1">
                      <div className="text-3xl">{location.country}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">
                          {location.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {location.description}
                        </p>
                      </div>
                    </div>

                    {/* Connect Button */}
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm font-medium text-gray-600 group-hover:text-orange-600 transition-colors">
                        Click to connect
                      </span>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                    </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Features Section */}
          <motion.div className="text-center" variants={itemVariants}>
            <div className="inline-flex flex-wrap justify-center items-center gap-8 px-8 py-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-700 font-medium">
                  256-bit encryption
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-700 font-medium">
                  No logs policy
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-700 font-medium">
                  2/5 support
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
