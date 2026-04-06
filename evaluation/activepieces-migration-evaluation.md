# Activepieces Migration Evaluation for Digikala

**Date**: April 2026
**Status**: Recommended for adoption

## Context

Digikala is evaluating whether to adopt [Activepieces](https://github.com/activepieces/activepieces) as its process automation platform. This document compares building a custom automation platform from scratch versus forking and customizing Activepieces.

---

## Executive Recommendation: Adopt Activepieces (Fork + Customize)

Activepieces is a strong fit for Digikala's automation needs. Building from scratch would take 12-18+ months and a dedicated team, while Activepieces provides a mature foundation customizable for the Iranian market.

---

## 1. Platform Comparison

| Criteria | Build Custom | Adopt Activepieces |
|---|---|---|
| Time to MVP | 6-12 months | 2-4 weeks (deploy) + custom pieces |
| Team required | 5-10 engineers full-time | 2-3 engineers for customization |
| Workflow builder UI | Must build from scratch | Production-ready visual builder |
| Integrations | Build each one manually | 500+ built-in + custom piece SDK |
| Maintenance burden | 100% on Digikala | Upstream updates available |
| Customization depth | Unlimited | Very high (MIT license, full source) |
| Risk | High (unproven) | Low (21k stars, 368 contributors) |

## 2. Activepieces Technical Profile

### Architecture
- **Frontend**: React UI with visual workflow builder
- **Backend**: Fastify (Node.js) REST API
- **Database**: PostgreSQL
- **Queue**: Redis + BullMQ for job processing
- **Engine**: Sandboxed flow execution engine (compiled to single JS file)
- **Monorepo**: Turbo-based TypeScript monorepo

### Key Metrics
- **GitHub Stars**: ~21,000
- **Contributors**: 368
- **Integrations**: 500-628+
- **Release Cadence**: ~every 3 days
- **Performance**: 95 flow executions/sec per instance, <300ms latency
- **License**: MIT (Community Edition)

### Packages Structure
```
packages/
  react-ui/       # Frontend
  server-api/     # Main API (Fastify)
  server-worker/  # Job execution worker
  server-shared/  # Shared logic
  engine/         # Flow execution engine
  pieces/         # Integration plugins (500+)
```

## 3. Why Activepieces Fits Digikala

### Advantages
- **MIT License** — Free to fork, modify, white-label, and use commercially (unlike n8n's restrictive license)
- **TypeScript monorepo** — Modern stack most teams can work with
- **Custom Pieces SDK** — Build Digikala-specific integrations as npm packages with hot-reload
- **Self-hosted** — Full data sovereignty, no cloud dependency
- **Multi-tenant** — Project-based isolation for different departments
- **No per-task fees** — Unlimited executions when self-hosted
- **Visual builder** — Non-technical operations teams can create workflows
- **AI/MCP native** — Built-in LLM integrations and 400+ MCP servers

### Challenges
- **No RTL/Farsi support** — UI needs RTL modifications (React-based, feasible)
- **No Iranian service integrations** — Must build custom pieces for payment, SMS, shipping
- **Fork maintenance** — Deep core changes make upstream merges harder
- **Smaller ecosystem** — 500+ vs Zapier's 8,000+ (but Digikala needs custom pieces anyway)

## 4. Technical Fit Analysis

| Requirement | Activepieces Support | Notes |
|---|---|---|
| Self-hosted | Docker/Kubernetes | Full infrastructure control |
| PostgreSQL | Native | Standard at Digikala |
| Horizontal scaling | Worker replicas | Add replicas as needed |
| Custom integrations | TypeScript SDK | npm packages with hot-reload |
| API access | REST API | Programmatic flow management |
| Webhook triggers | Built-in | Receive events from Digikala services |
| Scheduled triggers | Built-in | Cron-based automation |
| Code steps | JS/TS code blocks | Complex custom logic |
| Multi-team | Project isolation | Department-level separation |
| Monitoring | Basic built-in | Extend with Prometheus/Grafana |

## 5. Custom Pieces Required for Digikala

### Priority 1 — Core
| Piece | Description |
|---|---|
| Digikala Internal APIs | Order management, inventory, catalog, shipping |
| Iranian Payment Gateways | Zarinpal, Saman, Mellat, Parsian, Sadad |
| Iranian SMS Providers | Kavenegar, Ghasedak, Magfa |
| DigiPay | Digikala's payment service |
| Digikala Seller Panel | Marketplace seller management |

### Priority 2 — Operations
| Piece | Description |
|---|---|
| Persian Calendar (Jalali) | Shamsi date handling |
| Iranian Shipping | Tipax, Post, Mahex, SnapBox |
| Digikala CRM/Support | Internal ticketing |
| Digikala Analytics | BI/reporting APIs |

### Priority 3 — Communication
| Piece | Description |
|---|---|
| Bale Messenger | Iranian messaging platform |
| Eitaa | Iranian social platform |
| Rubika | Iranian super-app |
| Internal Notifications | Push, email, in-app |

## 6. Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| RTL/Farsi UI gaps | Medium | React UI is modifiable; contribute upstream or thin fork |
| Fork divergence | Medium | Build features as pieces (plugins) not core changes |
| Sanctions-related limits | Low | Self-hosted, MIT license, no cloud dependency |
| Scaling bottlenecks | Low | Proven horizontal scaling; benchmark first |
| Team learning curve | Low | TypeScript + React is common |
| Upstream abandonment | Low | 21k stars, releases every ~3 days, strong community |

## 7. Comparison with Alternatives

| Platform | License | Integrations | Self-Host | Customization | Verdict |
|---|---|---|---|---|---|
| **Activepieces** | MIT | 500+ | Yes | Excellent (pieces SDK) | **Recommended** |
| n8n | Sustainable Use (restrictive) | 1,100+ | Yes | Good | License blocks commercial white-label |
| Zapier | Proprietary SaaS | 8,000+ | No | Very limited | No self-hosting, expensive at scale |
| Make (Integromat) | Proprietary SaaS | 1,500+ | No | Limited | No self-hosting |
| Custom build | N/A | 0 | Yes | Unlimited | Too expensive/slow |

## 8. Migration Strategy

### Phase 1: Proof of Concept (2-4 weeks)
1. Deploy Activepieces via Docker internally
2. Build 2-3 critical custom pieces (Order API + Kavenegar SMS)
3. Create one end-to-end automation ("new order -> SMS notification")
4. Evaluate performance and developer experience

### Phase 2: RTL/Localization (2-4 weeks, parallel)
1. Fork the repository
2. Add RTL support to React UI
3. Add Farsi translations
4. Evaluate contributing back upstream

### Phase 3: Core Pieces Development (4-8 weeks)
1. Build Priority 1 custom pieces
2. Set up CI/CD for piece development
3. Create internal piece development documentation

### Phase 4: Production Rollout (2-4 weeks)
1. Deploy to production Kubernetes cluster
2. Migrate initial workflows
3. Train operations teams on visual builder
4. Set up monitoring and alerting

### Phase 5: Scale and Extend (Ongoing)
1. Build Priority 2 and 3 pieces
2. Onboard more departments
3. Maintain fork, selectively merge upstream

---

**Bottom line**: Activepieces gives Digikala 80%+ of what's needed out of the box. The remaining 20% (Iranian integrations, RTL, Farsi) is buildable with the platform's extensibility. Building from scratch would cost 5-10x more.
