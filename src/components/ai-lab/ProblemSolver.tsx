import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiOutlineLightningBolt, HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

interface SolutionSection {
  title: string;
  icon: string;
  content: string;
}

const sampleSolutions: Record<string, SolutionSection[]> = {
  default: [
    {
      title: "Clarifying Questions",
      icon: "❓",
      content:
        "Before architecting, I'd confirm: What's the expected QPS? Is this read-heavy or write-heavy? What are the latency requirements? What's the data retention policy? Are there compliance constraints?",
    },
    {
      title: "Assumptions",
      icon: "📋",
      content:
        "Assuming: ~10K concurrent users, 99.9% uptime SLA, eventual consistency is acceptable for non-critical paths, cloud-native deployment (AWS/GCP), and a small engineering team (3-5 devs).",
    },
    {
      title: "Proposed Architecture",
      icon: "🏗️",
      content:
        "Load Balancer → API Gateway → Microservices (Auth, Core Logic, Notifications) → Message Queue (for async tasks) → PostgreSQL (primary store) + Redis (cache layer) → CDN for static assets. Event-driven architecture for decoupled communication.",
    },
    {
      title: "Trade-offs",
      icon: "⚖️",
      content:
        "Microservices add operational complexity but enable independent scaling and deployment. PostgreSQL over NoSQL for strong consistency on critical data, accepting slightly higher write latency. Redis cache introduces cache invalidation complexity but reduces DB load by ~70%.",
    },
    {
      title: "Scaling Strategy",
      icon: "📈",
      content:
        "Phase 1: Vertical scaling + read replicas. Phase 2: Horizontal scaling with sharding by tenant ID. Phase 3: CQRS pattern to separate read/write workloads. Auto-scaling groups with health-based policies.",
    },
    {
      title: "Risks & Mitigation",
      icon: "🛡️",
      content:
        "Risk: Single point of failure in DB → Mitigation: Multi-AZ deployment with automated failover. Risk: Cache stampede → Mitigation: Staggered TTLs + circuit breakers. Risk: Data loss → Mitigation: WAL archiving + point-in-time recovery.",
    },
  ],
};

function generateSolution(problem: string): SolutionSection[] {
  const lower = problem.toLowerCase();
  const base = sampleSolutions.default;

  // Customize based on keywords
  if (lower.includes("chat") || lower.includes("messaging") || lower.includes("real-time")) {
    return [
      { title: "Clarifying Questions", icon: "❓", content: "What's the expected message volume? 1:1 only or group chats? Do we need message persistence, read receipts, typing indicators? What platforms (web, mobile, both)?" },
      { title: "Assumptions", icon: "📋", content: "Supporting 50K concurrent WebSocket connections, message delivery guarantee (at-least-once), 30-day message retention, end-to-end encryption not required initially." },
      { title: "Proposed Architecture", icon: "🏗️", content: "WebSocket Gateway (sticky sessions) → Connection Manager → Message Router → Kafka (message bus) → Chat Service → PostgreSQL (messages) + Redis (presence/sessions). Fan-out on write for small groups, fan-out on read for large channels." },
      { title: "Trade-offs", icon: "⚖️", content: "WebSockets over polling: lower latency but harder to scale horizontally. Kafka over RabbitMQ: higher throughput but more operational overhead. Fan-out on write: faster reads but more storage." },
      { title: "Scaling Strategy", icon: "📈", content: "Shard WebSocket connections by user hash. Partition Kafka topics by conversation ID. Horizontal scaling of stateless message routers. CDN for media attachments." },
      { title: "Risks & Mitigation", icon: "🛡️", content: "Risk: Message ordering → Mitigation: Sequence numbers per conversation. Risk: Connection drops → Mitigation: Automatic reconnection with message catch-up via last-seen offset. Risk: Hot partitions → Mitigation: Consistent hashing with virtual nodes." },
    ];
  }

  if (lower.includes("auth") || lower.includes("login") || lower.includes("security")) {
    return [
      { title: "Clarifying Questions", icon: "❓", content: "What auth methods are needed (email/password, OAuth, SSO)? What's the compliance requirement (SOC2, GDPR)? Is MFA required? What's the session management strategy?" },
      { title: "Assumptions", icon: "📋", content: "Multi-tenant SaaS application, OAuth 2.0 + email/password, JWT-based sessions with refresh tokens, RBAC authorization model, GDPR-compliant data handling." },
      { title: "Proposed Architecture", icon: "🏗️", content: "Identity Provider (custom or Auth0) → JWT issuance → API Gateway validates tokens → RBAC middleware → Resource servers. Refresh token rotation with family detection. Password hashing with Argon2id." },
      { title: "Trade-offs", icon: "⚖️", content: "JWTs over sessions: stateless scaling but harder to revoke. Argon2id over bcrypt: more resistant to GPU attacks but higher CPU cost. Custom auth over Auth0: full control but more maintenance." },
      { title: "Scaling Strategy", icon: "📈", content: "Stateless JWT validation scales horizontally. Token revocation via short-lived access tokens (15min) + revocation list in Redis. Rate limiting per IP and per user." },
      { title: "Risks & Mitigation", icon: "🛡️", content: "Risk: Token theft → Mitigation: Refresh token rotation, device binding, anomaly detection. Risk: Brute force → Mitigation: Progressive delays, account lockout, CAPTCHA. Risk: Session fixation → Mitigation: Regenerate session on privilege change." },
    ];
  }

  if (lower.includes("ml") || lower.includes("machine learning") || lower.includes("ai") || lower.includes("model")) {
    return [
      { title: "Clarifying Questions", icon: "❓", content: "What's the inference latency requirement? Batch or real-time predictions? What's the model size and update frequency? What's the acceptable accuracy threshold?" },
      { title: "Assumptions", icon: "📋", content: "Real-time inference under 200ms p99, model updates weekly, A/B testing required, monitoring for data drift, GPU inference in production." },
      { title: "Proposed Architecture", icon: "🏗️", content: "Feature Store → Model Registry (MLflow) → Serving Layer (TensorFlow Serving / Triton) → API Gateway → Application. Shadow deployment for new models. Feature pipeline: Spark → Feature Store → Online/Offline serving." },
      { title: "Trade-offs", icon: "⚖️", content: "Real-time feature computation vs pre-computed: freshness vs latency. GPU serving vs CPU: cost vs throughput. Batch predictions: cheaper but stale data." },
      { title: "Scaling Strategy", icon: "📈", content: "Auto-scaling GPU instances based on queue depth. Model distillation for latency-critical paths. Caching frequent predictions. Async batch processing for non-urgent requests." },
      { title: "Risks & Mitigation", icon: "🛡️", content: "Risk: Model degradation → Mitigation: Data drift monitoring, automated retraining triggers. Risk: Adversarial inputs → Mitigation: Input validation, anomaly detection. Risk: Cold start → Mitigation: Model warming, keep-alive probes." },
    ];
  }

  return base;
}

export default function ProblemSolver() {
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState<SolutionSection[] | null>(null);
  const [thinking, setThinking] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const handleSolve = () => {
    if (!problem.trim()) return;
    setThinking(true);
    setSolution(null);
    setExpandedIdx(null);

    setTimeout(() => {
      setSolution(generateSolution(problem));
      setThinking(false);
    }, 2500);
  };

  return (
    <section id="challenge-me" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <HiOutlineLightningBolt className="w-4 h-4 text-neon-cyan" />
            <span className="text-xs text-muted-foreground font-mono tracking-wider uppercase">
              Real-Time Problem Solver Mode™
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Challenge <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Give a real engineering problem. Watch structured, senior-level reasoning unfold.
          </p>
        </motion.div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-6 mb-8"
        >
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Give me a real engineering problem…"
            rows={3}
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none resize-none font-mono text-sm leading-relaxed"
          />
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-muted-foreground">
              Try: "Design a real-time chat system" or "Build a secure auth system"
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSolve}
              disabled={thinking || !problem.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-neon-purple to-neon-cyan text-primary-foreground font-semibold text-sm disabled:opacity-40 transition-opacity"
            >
              {thinking ? "Analyzing…" : "Solve It"}
            </motion.button>
          </div>
        </motion.div>

        {/* Thinking indicator */}
        <AnimatePresence>
          {thinking && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass rounded-2xl p-6 mb-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-neon-cyan"
                      animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground font-mono">
                  Decomposing problem → Analyzing constraints → Architecting solution…
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Solution */}
        <AnimatePresence>
          {solution && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              {solution.map((section, idx) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.12 }}
                  className="glass rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{section.icon}</span>
                      <span className="font-semibold text-sm text-foreground">{section.title}</span>
                    </div>
                    {expandedIdx === idx ? (
                      <HiOutlineChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <HiOutlineChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedIdx === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                          {section.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center text-xs text-muted-foreground pt-4 font-mono"
              >
                This is how Cheralathan approaches real-world system design.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
