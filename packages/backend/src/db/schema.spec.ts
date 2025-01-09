import * as schema from './schema';

describe('schema', () => {
  describe('heroes', () => {
    it('should have correct columns', () => {
      expect(schema.heroes.id).toBeDefined();
      expect(schema.heroes.email).toBeDefined();
      expect(schema.heroes.password).toBeDefined();
      expect(schema.heroes.username).toBeDefined();
      expect(schema.heroes.heroName).toBeDefined();
      expect(schema.heroes.classId).toBeDefined();
      expect(schema.heroes.level).toBeDefined();
      expect(schema.heroes.xpPoints).toBeDefined();
      expect(schema.heroes.gold).toBeDefined();
      expect(schema.heroes.stats).toBeDefined();
      expect(schema.heroes.createdAt).toBeDefined();
      expect(schema.heroes.updatedAt).toBeDefined();
    });
  });

  describe('characterClasses', () => {
    it('should have correct columns', () => {
      expect(schema.characterClasses.id).toBeDefined();
      expect(schema.characterClasses.name).toBeDefined();
      expect(schema.characterClasses.description).toBeDefined();
      expect(schema.characterClasses.abilities).toBeDefined();
      expect(schema.characterClasses.startingStats).toBeDefined();
    });
  });

  describe('quests', () => {
    it('should have correct columns', () => {
      expect(schema.quests.id).toBeDefined();
      expect(schema.quests.heroId).toBeDefined();
      expect(schema.quests.title).toBeDefined();
      expect(schema.quests.description).toBeDefined();
      expect(schema.quests.type).toBeDefined();
      expect(schema.quests.difficulty).toBeDefined();
      expect(schema.quests.status).toBeDefined();
      expect(schema.quests.rewards).toBeDefined();
      expect(schema.quests.prerequisites).toBeDefined();
      expect(schema.quests.deadline).toBeDefined();
      expect(schema.quests.completedAt).toBeDefined();
      expect(schema.quests.createdAt).toBeDefined();
      expect(schema.quests.updatedAt).toBeDefined();
    });
  });

  describe('items', () => {
    it('should have correct columns', () => {
      expect(schema.items.id).toBeDefined();
      expect(schema.items.name).toBeDefined();
      expect(schema.items.description).toBeDefined();
      expect(schema.items.type).toBeDefined();
      expect(schema.items.rarity).toBeDefined();
      expect(schema.items.effects).toBeDefined();
      expect(schema.items.stackable).toBeDefined();
    });
  });

  describe('heroInventory', () => {
    it('should have correct columns', () => {
      expect(schema.heroInventory.id).toBeDefined();
      expect(schema.heroInventory.heroId).toBeDefined();
      expect(schema.heroInventory.itemId).toBeDefined();
      expect(schema.heroInventory.quantity).toBeDefined();
      expect(schema.heroInventory.equipped).toBeDefined();
    });
  });

  describe('skillTrees', () => {
    it('should have correct columns', () => {
      expect(schema.skillTrees.id).toBeDefined();
      expect(schema.skillTrees.name).toBeDefined();
      expect(schema.skillTrees.description).toBeDefined();
      expect(schema.skillTrees.category).toBeDefined();
      expect(schema.skillTrees.prerequisites).toBeDefined();
    });
  });

  describe('skills', () => {
    it('should have correct columns', () => {
      expect(schema.skills.id).toBeDefined();
      expect(schema.skills.treeId).toBeDefined();
      expect(schema.skills.name).toBeDefined();
      expect(schema.skills.description).toBeDefined();
      expect(schema.skills.level).toBeDefined();
      expect(schema.skills.effects).toBeDefined();
      expect(schema.skills.cost).toBeDefined();
      expect(schema.skills.prerequisites).toBeDefined();
    });
  });

  describe('heroSkills', () => {
    it('should have correct columns', () => {
      expect(schema.heroSkills.id).toBeDefined();
      expect(schema.heroSkills.heroId).toBeDefined();
      expect(schema.heroSkills.skillId).toBeDefined();
      expect(schema.heroSkills.unlockedAt).toBeDefined();
    });
  });

  describe('achievements', () => {
    it('should have correct columns', () => {
      expect(schema.achievements.id).toBeDefined();
      expect(schema.achievements.name).toBeDefined();
      expect(schema.achievements.description).toBeDefined();
      expect(schema.achievements.type).toBeDefined();
      expect(schema.achievements.requirements).toBeDefined();
      expect(schema.achievements.rewards).toBeDefined();
    });
  });

  describe('heroAchievements', () => {
    it('should have correct columns', () => {
      expect(schema.heroAchievements.id).toBeDefined();
      expect(schema.heroAchievements.heroId).toBeDefined();
      expect(schema.heroAchievements.achievementId).toBeDefined();
      expect(schema.heroAchievements.unlockedAt).toBeDefined();
    });
  });

  describe('relations', () => {
    it('should define heroes relations', () => {
      expect(schema.heroesRelations).toBeDefined();
    });

    it('should define character classes relations', () => {
      expect(schema.characterClassesRelations).toBeDefined();
    });

    it('should define quests relations', () => {
      expect(schema.questsRelations).toBeDefined();
    });

    it('should define items relations', () => {
      expect(schema.itemsRelations).toBeDefined();
    });

    it('should define hero inventory relations', () => {
      expect(schema.heroInventoryRelations).toBeDefined();
    });

    it('should define skill trees relations', () => {
      expect(schema.skillTreesRelations).toBeDefined();
    });

    it('should define skills relations', () => {
      expect(schema.skillsRelations).toBeDefined();
    });

    it('should define achievements relations', () => {
      expect(schema.achievementsRelations).toBeDefined();
    });

    it('should define hero achievements relations', () => {
      expect(schema.heroAchievementsRelations).toBeDefined();
    });
  });
});
