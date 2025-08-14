import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Message {
  senderType: string;
  text: string;
  time: string;
}

interface Conversation {
  id: number;
  name: string;
  userType: 'Agent' | 'Facilitator' | 'Patient' | 'Admin';
  lastMessage: string;
  time: string;
  unreadCount: number;
  messages: Message[];
}

@Component({
  selector: 'app-message-screen',
  imports: [FormsModule, CommonModule],
  templateUrl: './message-screen.component.html'
})
export class MessageScreenComponent {
  conversationSearch = '';
  newMessage = '';
  selectedConversation: Conversation | null = null;

  conversations: Conversation[] = [
    {
      id: 1,
      name: 'John Doe',
      userType: 'Patient',
      lastMessage: 'When is my next appointment?',
      time: '10:05 AM',
      unreadCount: 2,
      messages: [
        { senderType: 'Patient', text: 'When is my next appointment?', time: '10:05 AM' },
        { senderType: 'Admin', text: 'It is scheduled for 20th Aug.', time: '10:06 AM' }
      ]
    },
    {
      id: 2,
      name: 'MediCare Travel',
      userType: 'Facilitator',
      lastMessage: 'Report uploaded.',
      time: '09:15 AM',
      unreadCount: 0,
      messages: [
        { senderType: 'Facilitator', text: 'Report uploaded.', time: '09:15 AM' },
        { senderType: 'Admin', text: 'Received, thank you.', time: '09:17 AM' }
      ]
    },
    {
      id: 3,
      name: 'Travel Agent X',
      userType: 'Agent',
      lastMessage: 'Need update on bookings.',
      time: 'Yesterday',
      unreadCount: 1,
      messages: [
        { senderType: 'Agent', text: 'Need update on bookings.', time: 'Yesterday' },
        { senderType: 'Admin', text: 'Will update you by evening.', time: 'Yesterday' }
      ]
    }
  ];

  get filteredConversations(): Conversation[] {
    if (!this.conversationSearch.trim()) return this.conversations;
    const term = this.conversationSearch.toLowerCase();
    return this.conversations.filter(c => c.name.toLowerCase().includes(term));
  }

  selectConversation(conv: Conversation) {
    this.selectedConversation = conv;
    conv.unreadCount = 0; // clear unread when opened
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedConversation) return;
    this.selectedConversation.messages.push({
      senderType: 'Admin',
      text: this.newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    this.selectedConversation.lastMessage = this.newMessage.trim();
    this.newMessage = '';
  }
}
