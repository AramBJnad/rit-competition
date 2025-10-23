import React from "react";
import { Users, Heart, Droplet, GraduationCap } from "lucide-react";
import CountUp from "react-countup";
import './impactsection.css'

const ImpactSection = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-white" />,
      value: 2500000,
      suffix: "+",
      subtitle: "Lives Impacted",
      color: "from-sky-400 to-blue-500",
    },
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      value: 45000,
      suffix: "+",
      subtitle: "Active Donors",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <Droplet className="w-8 h-8 text-white" />,
      value: 1200,
      suffix: "+",
      subtitle: "Clean Water Wells",
      color: "from-emerald-400 to-teal-500",
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-white" />,
      value: 50000,
      suffix: "+",
      subtitle: "Children Educated",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#0b1220] to-[#08101a] text-center">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-white text-lg font-semibold mb-2">Our Impact</h2>
        <p className="text-gray-300 mb-12">
          Thanks to our incredible supporters, we've been able to create meaningful change across the globe.
          Here's what we've accomplished together.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-[#121a29]/70 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center shadow-lg hover:shadow-2xl transition"
            >
              <div
                className={`p-4 rounded-full bg-gradient-to-r ${item.color} mb-4`}
              >
                {item.icon}
              </div>
              <h3 className="text-white text-2xl font-bold">
                <CountUp
                  end={item.value}
                  duration={2.5}
                  separator=","
                />
                {item.suffix}
              </h3>
              <p className="text-gray-300 mt-1">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
