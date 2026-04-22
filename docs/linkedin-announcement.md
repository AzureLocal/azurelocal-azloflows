# LinkedIn Announcement — AzLoFlows v1.5

---

As a Product Manager, I believe the pinnacle of our craft is taking something deeply complex and making it instantly understandable. Not with a 40-page doc. Not with a static Visio diagram that's outdated before the meeting starts. But with a dynamic, interactive visual that lets people explore the complexity on their own terms.

That belief is what drove me to build  **AzLoFlows** — a personal, free, open-source, browser-based isometric diagram builder purpose-built for Azure Local network architectures.

Azure Local deployments involve intricate traffic flows across firewalls, proxies, Arc gateways, private endpoints, and public paths. Explaining how traffic routes differently depending on the configuration — with proxy, without proxy, with Arc gateway, without — is one of the hardest things to communicate clearly. I've seen architects struggle with it, engineers debate it during security reviews, and customers get lost in static slides.

So I built the tool I wished existed:

🔹 **One-click predefined scenarios** — Load a complete Public Path or Private Path diagram instantly
🔹 **Interactive scenario switching** — Toggle between No Proxy, Proxy only, Arc Gateway only, or Proxy + Arc and watch the traffic flows reroute in real time
🔹 **Traffic source filtering** — Isolate flows from Hosts, ARB, AKS, or different VM configurations to focus on exactly what matters
🔹 **Traffic type breakdown** — See HTTP endpoints, Arc gateway allowed endpoints, Azure Private Endpoints, bypass routes, and non-allowed public endpoints — each as distinct animated flows
🔹 **Export-ready** — PNG, SVG, JSON, and self-contained interactive HTML for docs, presentations, and stakeholder reviews
🔹 **No sign-up. No server. Runs entirely in your browser.**

It's also a general-purpose isometric diagramming tool — 14+ shape types, animated connectors, dark/light themes, snap-to-grid, layers panel, and more. Think lightweight Visio for cloud architecture, but interactive and free.

Check out the 30-second demo below to see it in action — loading the Public Path scenario and filtering through different sources and traffic types interactively.

🔗 **Try it now**: https://cristianedwards.github.io/AzLoFlows/
📦 **Source code**: https://github.com/CristianEdwards/AzLoFlows

MIT licensed. Built with React 19, TypeScript, and Canvas 2D.

What network scenarios would be most useful for your team? I'd love to hear your feedback.

#AzureLocal #Azure #NetworkArchitecture #OpenSource #CloudArchitecture #AzureStackHCI #ProductManagement #DiagramBuilder #TypeScript #React

---
