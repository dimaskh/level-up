import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Profile Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile information and avatar.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Avatar</Button>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <Label htmlFor="heroName">Hero Name</Label>
                  <Input
                    id="heroName"
                    defaultValue="Thorgrim the Mighty"
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    defaultValue="hero@example.com"
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="class">Class</Label>
                  <Input
                    id="class"
                    defaultValue="Warrior"
                    disabled
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {isEditing && (
                <Button>Save Changes</Button>
              )}
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
              <CardDescription>
                Your hero's current statistics and attributes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Level</Label>
                  <div className="text-2xl font-bold">5</div>
                </div>
                <div>
                  <Label>XP Points</Label>
                  <div className="text-2xl font-bold">2,500</div>
                </div>
                <div>
                  <Label>Strength</Label>
                  <div className="text-2xl font-bold">18</div>
                </div>
                <div>
                  <Label>Agility</Label>
                  <div className="text-2xl font-bold">12</div>
                </div>
                <div>
                  <Label>Intelligence</Label>
                  <div className="text-2xl font-bold">8</div>
                </div>
                <div>
                  <Label>Charisma</Label>
                  <div className="text-2xl font-bold">14</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize your interface preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add appearance settings here */}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add notification settings here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
