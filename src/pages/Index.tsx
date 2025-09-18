import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface SlotMachine {
  id: number;
  name: string;
  image: string;
  jackpot: number;
  minBet: number;
  maxBet: number;
  rtp: number;
}

interface JackpotDisplay {
  name: string;
  amount: number;
  increment: number;
}

const Index = () => {
  const [jackpots, setJackpots] = useState<JackpotDisplay[]>([
    { name: "MEGA JACKPOT", amount: 2847329, increment: 127 },
    { name: "MAJOR JACKPOT", amount: 584721, increment: 43 },
    { name: "MINI JACKPOT", amount: 12847, increment: 7 }
  ]);

  const [slotMachines] = useState<SlotMachine[]>([
    {
      id: 1,
      name: "Golden Sevens",
      image: "/img/2ec1e19e-d6fa-4538-85f5-15dda31084cc.jpg",
      jackpot: 125000,
      minBet: 1,
      maxBet: 500,
      rtp: 96.5
    },
    {
      id: 2,
      name: "Diamond Rush",
      image: "/img/2ec1e19e-d6fa-4538-85f5-15dda31084cc.jpg",
      jackpot: 89000,
      minBet: 2,
      maxBet: 1000,
      rtp: 97.2
    },
    {
      id: 3,
      name: "Lucky Cherries",
      image: "/img/2ec1e19e-d6fa-4538-85f5-15dda31084cc.jpg",
      jackpot: 45000,
      minBet: 0.5,
      maxBet: 250,
      rtp: 95.8
    },
    {
      id: 4,
      name: "Royal Bars",
      image: "/img/2ec1e19e-d6fa-4538-85f5-15dda31084cc.jpg",
      jackpot: 156000,
      minBet: 5,
      maxBet: 2000,
      rtp: 98.1
    }
  ]);

  // Progressive jackpot animation
  useEffect(() => {
    const interval = setInterval(() => {
      setJackpots(prev => prev.map(jackpot => ({
        ...jackpot,
        amount: jackpot.amount + Math.floor(Math.random() * jackpot.increment)
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-casino-dark text-casino-white">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-casino-dark via-casino-charcoal to-casino-dark border-b border-casino-gold/20">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(/img/8ba361b3-f335-460e-8ca3-3ff0d7d42a37.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-5xl font-heading font-bold text-casino-gold mb-2">
              SLOTGAM.RU
            </h1>
            <p className="text-xl text-casino-white/80 font-body">
              Премиальные слот-машины с прогрессивными джекпотами
            </p>
          </div>
        </div>
      </header>

      {/* Progressive Jackpots */}
      <section className="bg-gradient-to-b from-casino-charcoal to-casino-dark py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-casino-gold text-center mb-8">
            ПРОГРЕССИВНЫЕ ДЖЕКПОТЫ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jackpots.map((jackpot, index) => (
              <Card key={index} className="bg-casino-charcoal border-casino-gold/30 hover:border-casino-gold/60 transition-all duration-300 transform hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-casino-gold text-center font-heading">
                    {jackpot.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-casino-white font-heading animate-pulse">
                      {formatCurrency(jackpot.amount)}
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Icon name="TrendingUp" className="text-casino-gold" size={16} />
                      <span className="text-casino-gold text-sm font-body">
                        Растет каждую секунду
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Slot Machines */}
      <section className="py-16 bg-casino-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-casino-gold text-center mb-12">
            КОЛЛЕКЦИЯ СЛОТОВ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {slotMachines.map((slot) => (
              <Card key={slot.id} className="bg-casino-charcoal border-casino-gold/30 hover:border-casino-gold transition-all duration-300 group cursor-pointer">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={slot.image} 
                      alt={slot.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-casino-gold text-casino-dark font-body font-semibold">
                        RTP {slot.rtp}%
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-xl font-heading font-bold text-casino-white mb-4">
                    {slot.name}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-casino-white/70 font-body">Джекпот:</span>
                      <span className="text-casino-gold font-bold font-body">
                        {formatCurrency(slot.jackpot)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-casino-white/70 font-body">Ставка:</span>
                      <span className="text-casino-white font-body">
                        {formatCurrency(slot.minBet)} - {formatCurrency(slot.maxBet)}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-casino-gold hover:bg-casino-gold/90 text-casino-dark font-heading font-bold py-3 transition-all duration-300 hover:shadow-lg hover:shadow-casino-gold/20">
                    <Icon name="Play" className="mr-2" size={18} />
                    ИГРАТЬ СЕЙЧАС
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-b from-casino-dark to-casino-charcoal">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-casino-gold/20 rounded-full mb-4">
                <Icon name="Zap" className="text-casino-gold" size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold text-casino-gold mb-2">
                Мгновенные выплаты
              </h3>
              <p className="text-casino-white/70 font-body">
                Получайте выигрыши моментально на ваш счет
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-casino-gold/20 rounded-full mb-4">
                <Icon name="Shield" className="text-casino-gold" size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold text-casino-gold mb-2">
                Безопасность
              </h3>
              <p className="text-casino-white/70 font-body">
                Лицензированная площадка с защитой данных
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-casino-gold/20 rounded-full mb-4">
                <Icon name="Gift" className="text-casino-gold" size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold text-casino-gold mb-2">
                Бонусы
              </h3>
              <p className="text-casino-white/70 font-body">
                Щедрые приветственные бонусы для новичков
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-casino-charcoal border-t border-casino-gold/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-casino-white/60 font-body">
            © 2024 SLOTGAM.RU - Играй ответственно. 18+
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;