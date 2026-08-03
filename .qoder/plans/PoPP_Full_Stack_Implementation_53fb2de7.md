# PoPP Full Stack Implementation Plan

## Overview
Implement the complete PoPP protocol: ticket submission, validation workflow, ZK-proof generation, and mobile app integration.

---

## Phase 1: Ticket Module Implementation

### 1.1 Proto Definitions (`proto/popp/ticket/ticket.proto`)
Add new message types:
```protobuf
message Ticket {
  string id = 1;              // PoP-ID: pop://{timestamp}/{region}/{category}/{hash}
  string description = 2;
  string location = 3;        // GPS coordinates or zone ID
  string category = 4;        // infrastructure, health, fraud, etc.
  string evidence_hash = 5;   // SHA-256 hash of evidence files
  string submitter = 6;       // Address (anonymous or verified)
  TicketStatus status = 7;    // SUBMITTED, VALIDATING, VALIDATED, REJECTED, PROVEN
  int64 timestamp = 8;
  string region = 9;
}

enum TicketStatus {
  SUBMITTED = 0;
  VALIDATING = 1;
  VALIDATED = 2;
  REJECTED = 3;
  PROVEN = 4;
  ESCALATED = 5;
  RESOLVED = 6;
}
```

### 1.2 Messages (`proto/popp/ticket/tx.proto`)
```protobuf
message MsgSubmitTicket {
  string submitter = 1;
  string description = 2;
  string location = 3;
  string category = 4;
  string evidence_hash = 5;
  string region = 6;
}

message MsgUpdateTicketStatus {
  string authority = 1;
  string ticket_id = 2;
  TicketStatus status = 3;
}
```

### 1.3 Keeper Implementation (`x/ticket/keeper/`)
- `CreateTicket(ctx, msg)` - Create new ticket, generate PoP-ID, emit event
- `GetTicket(ctx, id)` - Retrieve ticket by ID
- `GetAllTickets(ctx)` - List all tickets
- `GetTicketsByStatus(ctx, status)` - Filter by status
- `GetTicketsByCategory(ctx, category)` - Filter by category
- `UpdateTicketStatus(ctx, ticketId, status)` - Update status (only by validators/gov)

### 1.4 Queries (`proto/popp/ticket/query.proto`)
```protobuf
rpc Ticket(QueryTicketRequest) returns (QueryTicketResponse);
rpc Tickets(QueryTicketsRequest) returns (QueryTicketsResponse);
rpc TicketsByStatus(QueryTicketsByStatusRequest) returns (QueryTicketsByStatusResponse);
rpc TicketsByCategory(QueryTicketsByCategoryRequest) returns (QueryTicketsByCategoryResponse);
```

---

## Phase 2: Validation Module Implementation

### 2.1 Proto Definitions (`proto/popp/validation/validator.proto`)
```protobuf
message Validator {
  string address = 1;
  ValidatorLevel level = 2;   // L0-L5
  string domain = 3;          // Specialization area
  int64 reputation = 4;       // Proof Respect Score
  int64 stake = 5;            // Staked tokens
  bool active = 6;
  int64 validations_count = 7;
  int64 accuracy_score = 8;
}

enum ValidatorLevel {
  CANDIDATE = 0;     // L0 - Not yet authorized
  COMMUNITY = 1;     // L1 - Basic validator
  DOMAIN = 2;        // L2 - Domain expert
  INSTITUTIONAL = 3; // L3 - Organization
  AUTONOMOUS = 4;    // L4 - AI/IoT
  EMERGENCY = 5;     // L5 - Critical cases
}

message Validation {
  string ticket_id = 1;
  string validator = 2;
  ValidationVote vote = 3;    // APPROVE, REJECT, FLAG
  string reasoning = 4;
  int64 timestamp = 5;
  int64 weight = 6;           // Based on reputation
}
```

### 2.2 Messages
```protobuf
message MsgRegisterValidator {
  string address = 1;
  string domain = 2;
  int64 stake = 3;
}

message MsgSubmitValidation {
  string validator = 1;
  string ticket_id = 2;
  ValidationVote vote = 3;
  string reasoning = 4;
}

message MsgUpdateReputation {
  string validator = 1;
  int64 new_reputation = 2;
}
```

### 2.3 Keeper Implementation
- `RegisterValidator(ctx, msg)` - Register new validator with stake
- `SubmitValidation(ctx, msg)` - Submit vote, calculate weighted consensus
- `CheckConsensus(ctx, ticketId)` - Check if 75% weighted consensus reached
- `UpdateReputation(ctx, validator, delta)` - Adjust reputation based on outcomes
- `SelectValidators(ctx, ticket)` - Dynamic validator selection based on domain/location

---

## Phase 3: Proof Module with ZK-Proofs

### 3.1 Proto Definitions (`proto/popp/proof/proof.proto`)
```protobuf
message Proof {
  string pop_id = 1;          // pop://{timestamp}/{region}/{category}/{hash}
  string ticket_id = 2;
  bytes content_hash = 3;     // SHA-256 of ticket content
  bytes zk_proof = 4;         // Zero-knowledge proof bytes
  repeated string validators = 5;
  int64 timestamp = 6;
  ProofLevel level = 7;
  bytes public_inputs = 8;    // Public inputs for ZK verification
}

enum ProofLevel {
  SIMPLE_HASH = 0;