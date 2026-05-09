import { motion } from "motion/react";
import { MessageSquare, Layout, Gamepad2, ImageIcon, Globe, Zap } from "lucide-react";

const features = [
  { icon: <MessageSquare className="w-6 h-6" />, title: "AI Chat Assistant", description: "Real-time intelligent conversations, multi-language support, and code generation.", gradient: "from-purple-500 to-pink-500" },
  { icon: <Layout className="w-6 h-6" />, title: "Website Builder", description: "Generate full, responsive websites from simple text prompts in seconds.", gradient: "from-blue-500 to-cyan-500" },
  { icon: <Gamepad2 className="w-6 h-6" />, title: "Game Generator", description: "Create fully functional 2D games and interactive experiences with text commands.", gradient: "from-brand-purple to-brand-blue" },
  { icon: <ImageIcon className="w-6 h-6" />, title: "Vision AI", description: "Upload any image and get detailed analysis, captions, or transform it into code.", gradient: "from-pink-500 to-orange-500" },
  { icon: <Globe className="w-6 h-6" />, title: "Instant Hosting", description: "One-click deployment for your generated projects with global CDN support.", gradient: "from-green-500 to-emerald-500" },
  { icon: <Zap className="w-6 h-6" />, title: "Extreme Speed", description: "Powered by ultra-fast inference models for near-instant generation times.", gradient: "from-yellow-500 to-orange-500" }
];

export default function Features() {
  return (
    <section className="py-24 relative overflow-hidden bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-[0.85]">Explore the <br/><span className="text-gradient">AI Ecosystem</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed font-medium">
            A unified workspace equipped with every tool you need to turn ideas into reality using next-generation intelligence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="glass rounded-[32px] p-10 border border-white/5 hover:border-purple-500/30 transition-all group relative overflow-hidden text-left">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-black/20`}>{feature.icon}</div>
              <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-tight">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed font-medium">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
