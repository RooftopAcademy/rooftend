"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const typeorm_1 = require("typeorm");
let Notification = class Notification {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        unsigned: true,
        type: 'bigint',
    }),
    __metadata("design:type", Number)
], Notification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_id',
        unsigned: true,
        type: 'bigint',
    }),
    __metadata("design:type", Number)
], Notification.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'action_url',
        type: 'character varying',
        length: 100
    }),
    __metadata("design:type", String)
], Notification.prototype, "action_url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'title',
        type: 'character varying',
        length: 20
    }),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'character varying',
        length: 120
    }),
    __metadata("design:type", String)
], Notification.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'image_url',
        type: 'character varying',
        length: 100
    }),
    __metadata("design:type", String)
], Notification.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], Notification.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'sent_at'
    }),
    __metadata("design:type", Date)
], Notification.prototype, "sent_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'read_at'
    }),
    __metadata("design:type", Date)
], Notification.prototype, "read_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'deleted_at'
    }),
    __metadata("design:type", Date)
], Notification.prototype, "deleted_at", void 0);
Notification = __decorate([
    (0, typeorm_1.Entity)({
        name: 'notification',
    })
], Notification);
exports.Notification = Notification;
//# sourceMappingURL=notification.entity.js.map