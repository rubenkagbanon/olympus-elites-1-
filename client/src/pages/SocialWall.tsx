/* ============================================================
   OLYMPUS ELITES — Social Wall Page
   Instagram & TikTok aggregation UI with hashtag filtering
   ============================================================ */
import Layout from "@/components/Layout";
import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle, Share2, Bookmark, Play, Hash, TrendingUp, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const hashtags = ["#OlympusElites2026", "#OlympusElites", "#FootballCI", "#IntellectuelCI", "#BasketballCI"];

const posts = [
  {
    id: 1, platform: "instagram", author: "lycee_moderne_abi", avatar: "LM",
    content: "Notre équipe de football est prête pour les demi-finales ! 🔥⚽ #OlympusElites2026 #FootballCI",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80",
    likes: 234, comments: 18, time: "il y a 2h", verified: true,
  },
  {
    id: 2, platform: "tiktok", author: "olympus_elites_ci", avatar: "OE",
    content: "Les meilleurs moments de la journée intellectuelle ! 🧠✨ #OlympusElites2026 #IntellectuelCI",
    image: null, isVideo: true,
    likes: 1420, comments: 87, time: "il y a 4h", verified: true,
  },
  {
    id: 3, platform: "instagram", author: "college_st_viateur", avatar: "SV",
    content: "Félicitations à notre équipe intellectuelle pour leur victoire 45-38 ! Fiers de vous 🏆 #OlympusElites2026",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80",
    likes: 189, comments: 24, time: "il y a 5h", verified: false,
  },
  {
    id: 4, platform: "instagram", author: "lycee_tech_bouake", avatar: "LT",
    content: "Entraînement intensif avant les finales ! 💪🏀 #BasketballCI #OlympusElites2026",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=400&q=80",
    likes: 156, comments: 12, time: "il y a 6h", verified: false,
  },
  {
    id: 5, platform: "tiktok", author: "olympus_elites_ci", avatar: "OE",
    content: "Retour sur les highlights de la semaine ! 🎬 #OlympusElites2026 #ChampionnatCI",
    image: null, isVideo: true,
    likes: 2890, comments: 143, time: "il y a 8h", verified: true,
  },
  {
    id: 6, platform: "instagram", author: "lycee_classique_abi", avatar: "LC",
    content: "Notre gymnaste Aya Konan représente fièrement notre établissement ! 🤸‍♀️ #OlympusElites2026",
    image: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&q=80",
    likes: 312, comments: 31, time: "il y a 10h", verified: false,
  },
];

const trending = [
  { tag: "#OlympusElites2026", posts: 1240 },
  { tag: "#FootballCI", posts: 456 },
  { tag: "#IntellectuelCI", posts: 312 },
  { tag: "#BasketballCI", posts: 198 },
  { tag: "#ChampionnatCI", posts: 167 },
];

export default function SocialWall() {
  const [activeFilter, setActiveFilter] = useState<"Tous" | "Instagram" | "TikTok">("Tous");
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const filtered = activeFilter === "Tous" ? posts :
    posts.filter(p => p.platform === activeFilter.toLowerCase());

  const toggleLike = (id: number) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="section-label mb-2">Module 7 / Social Wall</div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Oswald, sans-serif' }}>
                Social Wall
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Publications Instagram & TikTok — #OlympusElites2026
              </p>
            </div>
            <button
              onClick={() => toast.success("Flux actualisé !")}
              className="flex items-center gap-1.5 px-3 py-2 rounded border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
            >
              <RefreshCw size={13} /> Actualiser
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main feed */}
          <div className="lg:col-span-2">
            {/* Filter */}
            <div className="flex gap-2 mb-6">
              {(["Tous", "Instagram", "TikTok"] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium tracking-wider uppercase transition-all ${
                    activeFilter === f
                      ? "bg-primary/20 text-primary border border-primary/40"
                      : "bg-card text-muted-foreground border border-border hover:border-primary/30"
                  }`}
                  style={{ fontFamily: 'Oswald, sans-serif' }}
                >
                  {f === "Instagram" && <Instagram size={11} />}
                  {f === "TikTok" && <Play size={11} />}
                  {f}
                </button>
              ))}
            </div>

            {/* Posts grid */}
            <div className="columns-1 sm:columns-2 gap-4 space-y-4">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card-arena break-inside-avoid mb-4"
                >
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      post.author === "olympus_elites_ci"
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/10 text-foreground"
                    }`}>
                      {post.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-semibold text-foreground truncate">@{post.author}</span>
                        {post.verified && <span className="text-primary text-xs">✓</span>}
                      </div>
                      <div className="text-[10px] text-muted-foreground">{post.time}</div>
                    </div>
                    <div className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase ${
                      post.platform === "instagram"
                        ? "bg-pink-500/20 text-pink-400 border border-pink-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}>
                      {post.platform === "instagram" ? "IG" : "TT"}
                    </div>
                  </div>

                  {/* Image/Video */}
                  {post.image && (
                    <div className="rounded overflow-hidden mb-3 -mx-1">
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full object-cover"
                        style={{ maxHeight: 220 }}
                      />
                    </div>
                  )}
                  {post.isVideo && (
                    <div className="rounded overflow-hidden mb-3 bg-black/40 flex items-center justify-center" style={{ height: 140 }}>
                      <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                        <Play size={20} className="text-primary ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <p className="text-xs text-foreground leading-relaxed mb-3">{post.content}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-2 border-t border-border/50">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1 text-xs transition-colors ${
                        likedPosts.has(post.id) ? "text-red-400" : "text-muted-foreground hover:text-red-400"
                      }`}
                    >
                      <Heart size={13} fill={likedPosts.has(post.id) ? "currentColor" : "none"} />
                      {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                      <MessageCircle size={13} /> {post.comments}
                    </button>
                    <button
                      onClick={() => toast.success("Lien copié !")}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto"
                    >
                      <Share2 size={13} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Trending hashtags */}
            <div className="card-arena">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-primary" />
                <h3 className="font-bold text-foreground text-sm" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Hashtags tendance
                </h3>
              </div>
              <div className="space-y-2">
                {trending.map((t, i) => (
                  <div key={t.tag} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground font-mono w-4">{i + 1}</span>
                      <span className="text-xs text-primary font-medium">{t.tag}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">{t.posts} posts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official hashtags */}
            <div className="card-arena">
              <div className="flex items-center gap-2 mb-4">
                <Hash size={16} className="text-primary" />
                <h3 className="font-bold text-foreground text-sm" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Hashtags officiels
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {hashtags.map(h => (
                  <span
                    key={h}
                    className="text-xs px-2 py-1 bg-primary/10 text-primary rounded border border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors"
                  >
                    {h}
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                Utilisez ces hashtags sur Instagram et TikTok pour apparaître sur le Social Wall officiel.
              </p>
            </div>

            {/* Stats */}
            <div className="card-arena">
              <h3 className="font-bold text-foreground text-sm mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
                Statistiques sociales
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Publications totales", value: "1 240" },
                  { label: "Impressions", value: "48 K" },
                  { label: "Comptes actifs", value: "87" },
                  { label: "Engagement moyen", value: "6.2%" },
                ].map(s => (
                  <div key={s.label} className="flex justify-between">
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                    <span className="font-mono font-bold text-primary text-xs">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
