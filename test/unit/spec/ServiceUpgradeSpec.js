describe("Upgrade service", function() {
  var spec = {};

  commonSpec(spec);

  describe('purchase functions', function() {

    it("should purchase an upgrade if cost is met", function() {
      spec.player.data = {elements:{},resources:{}};
      spec.player.data.resources['1H'] = {number:110};
      spec.player.data.elements.H = {upgrades:{}};
      spec.player.data.elements.H.upgrades["Tier 1-1"] = false;

      spec.upgrade.buyUpgrade("Tier 1-1",'H');

      expect(spec.player.data.resources['1H'].number).toEqual(10);
      expect(spec.player.data.elements.H.upgrades["Tier 1-1"]).toEqual(true);
    });

    it("should not purchase an upgrade if cost is not met", function() {
      spec.player.data = {elements:{},resources:{}};
      spec.player.data.resources['1H'] = {number:10};
      spec.player.data.elements.H = {upgrades:{}};
      spec.player.data.elements.H.upgrades["Tier 1-1"] = false;

      spec.upgrade.buyUpgrade("Tier 1-1",'H');

      expect(spec.player.data.resources['1H'].number).toEqual(10);
      expect(spec.player.data.elements.H.upgrades["Tier 1-1"]).toEqual(false);
    });

    it("should skip if the upgrade is already bought", function() {
      spec.player.data = {elements:{},resources:{}};
      spec.player.data.resources['1H'] = {number:10};
      spec.player.data.elements.H = {upgrades:{}};
      spec.player.data.elements.H.upgrades["Tier 1-1"] = true;

      spec.upgrade.buyUpgrade("Tier 1-1",'H');

      expect(spec.player.data.resources['1H'].number).toEqual(10);
      expect(spec.player.data.elements.H.upgrades["Tier 1-1"]).toEqual(true);
    });

    it("should return the las tier upgrade price", function() {
      spec.player.data = {elements:{}};
      spec.player.data.elements.H = {upgrades:{}};
      spec.player.data.elements.H.upgrades['Tier 1-1'] = true;
      spec.player.data.elements.H.upgrades['Tier 1-2'] = true;
      spec.player.data.elements.H.upgrades['Tier 1-3'] = false;
      spec.state.current_element = 'H';

      value = spec.upgrade.lastUpgradeTierPrice('Tier 1');

      expect(value).toEqual(10000);
    });

    it("should return null if all upgrades are bought", function() {
      spec.player.data = {elements:{}};
      spec.player.data.elements.H = {upgrades:{}};
      spec.player.data.elements.H.upgrades['Tier 1-1'] = true;
      spec.player.data.elements.H.upgrades['Tier 1-2'] = true;
      spec.player.data.elements.H.upgrades['Tier 1-3'] = true;
      spec.player.data.elements.H.upgrades['Tier 1-4'] = true;
      spec.player.data.elements.H.upgrades['Tier 1-5'] = true;
      spec.player.data.elements.H.upgrades['Tier 1-6'] = true;
      spec.player.data.elements.H.upgrades['Tier 1-7'] = true;
      spec.player.data.elements.H.upgrades['Tier 1-8'] = true;
      spec.player.data.elements.H.upgrades['Tier 1-9'] = true;
      spec.player.data.elements.H.upgrades['Tier 1-10'] = true;
      spec.player.data.elements.H.upgrades['Tier 1-11'] = true;
      spec.player.data.elements.H.upgrades['Tier 1-12'] = true;
      spec.player.data.elements.H.upgrades['Tier 1-13'] = true;
      spec.player.data.elements.H.upgrades['Tier 1-14'] = true;
      spec.state.current_element = 'H';

      value = spec.upgrade.lastUpgradeTierPrice('Tier 1');

      expect(value).toBeNull();
    });
  });
});
