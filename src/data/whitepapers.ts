export const whitepapers: Record<string, any> = {
  "core-protocol": {
    papers: [
      {
        id: "the-proof-of-problem-protocol", // 👈 paperId (slug)
        title:
          "The Proof-of-Problem Protocol (PoPP)",
        subtitle:
          "The Proof-of-Problem Protocol (PoPP): A Decentralized Framework for Verifying, Validating, and Escalating Real-World Problems",
        author: "Sharvan Kumar",
        version: "v1.0",
        date: "June 26, 2025",
        contact: "sharvanmodi900@gmail.com",
        sections: [
          {
            id: "abstract",
            heading: "Abstract",
            content: `The Proof-of-Problem Protocol (PoPP) introduces a decentralized, validator-assisted system that enables cryptographically verifiable, timestamped documentation of real-world problems — from personal injustice to systemic failures. In a world where genuine problems often go unrecognized due to bureaucracy, media bias, or lack of trust, PoPP provides a transparent, consensus-driven framework for problem validation.

Unlike current systems such as social media, RTI, or courts that are prone to manipulation, delay, or central control, PoPP ensures that any individual can raise an issue which is then independently verified by validators. These validators are incentivized and selected through a decentralized protocol. The final problem hash, once verified, is stored on-chain, ensuring immutability and enabling future resolution or escalation.

PoPP is unique in that it turns a “problem” into a verifiable proof, thus unlocking a new layer of civic participation, social trust, and decentralized governance. It bridges cryptographic technology with social realities — making suffering, injustice, and issues verifiable.`,
          },
          {
            id: "introduction",
            heading: "Introduction",
            content: `Across the globe, millions suffer in silence. Problems such as government corruption, denied subsidies, police abuse, or local infrastructure failures remain unresolved — not because they aren't real, but because they aren't verifiably real to systems that demand proof. There is currently no globally trusted, censorship-resistant platform where the voice of the common person can be validated transparently.

Centralized bureaucracies are slow and unaccountable. Social media amplifies noise, not truth. Even legal systems are often inaccessible or ineffective for the average citizen. As a result, real problems fade into the background, unverified and unaddressed.

This paper introduces the Proof-of-Problem Protocol (PoPP) — a blockchain-powered, validator-based, privacy-preserving protocol for verifying and recording real-world problems. By providing timestamped, immutable, and crowd-validated evidence, PoPP answers the fundamental question:

“Who validates the sufferer’s voice?”`,
          },
          {
            id: "motivation",
            heading: "Motivation",
            content: `Real-Life Examples:
- A farmer fails to receive his government-approved subsidy. Bureaucratic opacity prevents redress.
- A citizen facing police abuse has no platform to submit a trusted complaint.
- A whistleblower fears retaliation if they reveal corporate corruption.

In these cases, the core issue is not the problem itself — but the lack of cryptographic, timestamped, publicly verifiable proof that the problem even occurred.

Existing systems like RTI, courts, and media are centralized, slow, and often politically influenced. PoPP offers a decentralized alternative, ensuring consensus-based validation and immutability through blockchain technology.`,
          },
          {
            id: "architecture",
            heading: "Architecture Overview",
            content: `Roles:
- Problem Poster: Submits the problem.
- Validator: Applies to verify problems; selected via staking or randomized algorithms.
- Observer: Neutral third parties (NGOs, AI systems).
- Resolver: Entities who act on verified problems (optional).

Core Components:
- Validator Registry: On-chain list of active and past validators.
- Zero-Knowledge-Based Validation: For privacy-preserving validation.
- Problem Ledger: Metadata stored on IPFS; hash on blockchain.
- Escalation Paths: Pathways to handle disputed or unresolved problems.
- Incentive Mechanism: Rewards for validators; penalties for malicious actions.`,
          },
          {
            id: "phases",
            heading: "Protocol Phases",
            content: `1. Problem Submission  
Includes metadata, optional geolocation, timestamp, and evidence.  
Stored via IPFS and hash anchored on-chain.  

2. Validator Pool Voting  
Validators apply to validate specific problems.  
Selected based on reputation, randomness, or category expertise.  

3. Verification Phase  
Validators review problem and evidence.  
Vote: Valid / Invalid / Inconclusive  
Signed and recorded on-chain.  

4. Hash Commitments  
After quorum is reached, a zk-proof or signature bundle seals the state.  
Problem hash is committed to PoPP ledger.  

5. Publication  
Problem is stored publicly with all validator votes and comments.  

6. Escalation or Resolution  
Disputed or critical problems escalate to higher validators or governance DAO.  
Others are archived as proof or marked as resolved.`,
          },
          {
            id: "cryptography",
            heading: "Cryptographic Primitives",
            content: `1. Hashing  
- SHA-256, Poseidon (zk-friendly)  
- Protects against tampering  

2. Timestamping  
- Ethereum/Solana block timestamps  
- Ensures chronological accountability  

3. Zero-Knowledge Proofs  
- zk-SNARKs or zk-STARKs for privacy  
- Optional identity protection  

4. Validator Proofs  
- Signed validation actions  
- Stored with reputation metrics  

5. zk-ID / Proof-of-Humanity (Optional)  
- Ensure real actors without compromising anonymity`,
          },
          {
            id: "tokenomics",
            heading: "Tokenomics (Optional in v1)",
            content: `- PoP Token: Utility token for validator incentives  
- Staking: Required to participate as validator  
- Slashing: Penalties for dishonest or inactive validators  
- DAO: Future governance through token-weighted votes`,
          },
          {
            id: "governance",
            heading: "Governance & DAO Model",
            content: `- Decentralized voting on key decisions  
- Snapshot + IPFS-based governance proposals  
- Fraud reporting, validator rules, protocol upgrades  
- DAO-managed treasury for sustainability`,
          },
          {
            id: "security",
            heading: "Security Model",
            content: `PoPP is designed to resist:

- **Sybil Attacks**: Validators must stake tokens and build reputation  
- **Validator Collusion**: Randomized selection + stake slashing  
- **Fake Problem Flooding**: Minimum staking for problem submission  
- **Censorship**: Decentralized IPFS + multi-chain support`,
          },
          {
            id: "risks",
            heading: "Risks & Challenges",
            content: `- Legal resistance to decentralization  
- Potential for false claims  
- Difficulty in evidence verification  
- Privacy concerns  
- Long-term validator motivation`,
          },
          {
            id: "use-cases",
            heading: "Use Cases",
            content: `- Civic complaints (subsidy denial, corruption)  
- Human rights reports  
- Whistleblower disclosures  
- NGO field verification  
- AI-detected problems (e.g. satellite climate data, anomaly detection)`,
          },
          {
            id: "roadmap",
            heading: "Roadmap",
            content: `Phase | Timeline | Milestone  
------|-----------|------------------------------  
Alpha | Q3 2025  | Smart contracts, validator module  
Beta  | Q1 2026  | Public problem submission  
v1.0  | Q2 2026  | Governance launch, DAO voting  
v2.0  | Q4 2026  | zkProofs, AI validators integration`,
          },
          {
            id: "team",
            heading: "Team / Credits",
            content: `- Sharvan Modi — Inventor & Architect [Contact: sharvanmodi900@gmail.com]  
- (Optional collaborators to be added)`,
          },
          {
            id: "references",
            heading: "References",
            content: `- Kleros Protocol  
- Gitcoin & RetroPGF  
- Optimism Governance  
- IPFS & Arweave  
- Zero-Knowledge Proof Research Papers`,
          },
        ],
      },
      {
        id: "interactive-popp-whitepaper",
        title: "🚀 Interactive Whitepaper: The Proof of Problem Protocol (PoPP)",
        subtitle:
          "A layered, blockchain-based protocol that verifies, tokenizes, and solves real-world problems using a decentralized community, AI tools, and ethical governance.",
        author: "Sharvan Kumar",
        version: "v2.0-draft",
        date: "August 21, 2025",
        contact: "sharvanmodi900@gmail.com",
        sections: [
          {
            id: "overview",
            heading: "🔍 What is PoPP?",
            content: `PoPP is a layered, blockchain-based protocol that verifies, tokenizes, and solves real-world problems using a decentralized community, AI tools, and ethical governance. It transforms problems into data, data into tokens, and tokens into social and economic action.`,
          },
          {
            id: "layers",
            heading: "🧱 Layer-by-Layer Overview",
            content: `🟢 **L0 – Submission Layer**  
- Users submit real-world problems via web, mobile, or offline forms  
- Optional geotag, multimedia proof, identity modes (public, anonymous, SBT-linked)  
- Timestamped and optionally signed on-chain  

🔵 **L1 – Validation Layer**  
- AI and human validators check for spam, duplicates, clarity, and authenticity  
- Each submission gets a trust score and metadata  
- Validated problems are passed to tokenization  

🟣 **L2 – Tokenization Layer**  
- Validated problems are minted as NFTs or SBTs  
- Metadata includes location, validator ID, and score  
- Stored on-chain and indexed for visibility and funding  

🟢 **L3 – Collaboration & Escalation**  
- Solvers (NGOs, devs, DAOs) propose solutions to problems  
- DAO/community voting prioritizes critical issues  
- Lifecycle tracker monitors progress  

🟡 **L4 – Governance & Reward Layer**  
- Successful problem solvers and reporters are rewarded  
- Funds managed via DAO treasury with transparent rules  
- Builds on-chain reputation and unlocks future access and trust  

🟤 **L5 – Local DAOs & Offline Bridge**  
- Rural and offline communities can report issues via SMS, offline apps  
- Local validators, Raspberry Pi-based networks, sync-to-chain on connection  
- Ensures PoPP reaches underserved populations`,
          },
          {
            id: "flow",
            heading: "🌐 How It All Connects",
            content: `1. Problem is submitted (L0)  
2. Verified by AI/moderators (L1)  
3. Minted into a traceable token (L2)  
4. Matched with solvers and funders (L3)  
5. Rewarded and governed via DAOs (L4)  
6. Even remote areas can participate (L5)`,
          },
          {
            id: "use-cases",
            heading: "🧠 Use Cases",
            content: `- 🚰 Water crisis in rural India → NGO solution via PoPP  
- 📡 Urban flooding issue → escalated and funded by PoPP DAO  
- 🧾 Job loss or human rights abuses → tokenized and tracked`,
          },
          {
            id: "interactive-elements",
            heading: "🎨 Interactive Elements (Prototypes Suggested)",
            content: `- 🌍 PoPP Explorer UI: Browse tokenized problems by tag, urgency, geography  
- 🗳️ DAO Voting Dashboard: View governance actions, reward allocations  
- 🧾 Submission Simulator: Try submitting a problem and follow its journey  
- 🛠️ Proposal Pitch Tool: Build and publish a proposal to fix a tokenized issue`,
          },
          {
            id: "essence",
            heading: "🧩 PoPP = Proof + Purpose",
            content: `PoPP is not just a protocol. It’s:  
- A mechanism to verify reality  
- A tool to empower grassroots voices  
- A new layer of global accountability`,
          },
          {
            id: "roadmap",
            heading: "🛠️ What’s Next",
            content: `- Build frontend UI: Explorer, DAO, Submission Portal  
- Write smart contracts for tokenization & governance  
- Deploy pilot in local DAO or NGO cluster`,
          },
        ],
      },
    
    ],
    
  },
  
};
