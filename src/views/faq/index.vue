<template>
<div class="faq">
  <ol>
    <li class="faq-item">
      <h4 class="faq-item-title">
        What is 100 Rebate?
      </h4>
      <p class="faq-item-content">
        Rebatee is aimed to incubate online shoppers to influencers. With minimum influencing efforts, Rebatee members can get coins to exchange for rebates (savings) on your desired products. Members can also join Rebatee Influencers Club, and make money through utilizing influencing power.
      </p>
    </li>
    <li class="faq-item">
      <h4 class="faq-item-title">
        Is Rebates a deal site or shopping site?
      </h4>
      <p class="faq-item-content">
        Rebatee's mission is to help members save, influence and earn. We are founded to become an influencers incubator, to provide valuable newly released products, to help members achieve higher level influencer power, and get that converted to big savings and earnings for our members.
      </p>
    </li>
  </ol>
</div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
    };
  },
  mounted() {

  },
};
</script>

<style lang='scss'>
  .faq {
    padding: 32px 0;

    ol {
      padding-left: 1em;
      line-height: 3px;
    }

    .faq-item {
      list-style: decimal;
      line-height: 20px;
      font-size: 16px;
      color: rgb(51,51,51);

      .faq-item-title {
        font-weight: 700;
      }

      .faq-item-content {
        white-space: pre-wrap;
        font-size: 16px;
        word-break: normal;
      }
    }
  }
</style>
