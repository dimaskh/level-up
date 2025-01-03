import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { HeroesModule } from './heroes/heroes.module';
import { QuestsModule } from './quests/quests.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbModule,
    HeroesModule,
    QuestsModule,
  ],
})
export class AppModule {}
