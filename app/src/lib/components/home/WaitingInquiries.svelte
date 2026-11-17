<script lang="ts">
	import PageSection from "#lib/components/PageSection.svelte"
	import { openInquiryCount, waitingInquiries } from "#lib/sampleData.ts"
	import InquiryCard from "./InquiryCard.svelte"
</script>

<PageSection id="waiting-inquiries" title="Venter på svar" link={{ href: "/requests", label: `Se alle ${openInquiryCount}` }}>
	{#each waitingInquiries as inquiry (inquiry.instagramHandle)}
		<InquiryCard {inquiry} />
	{/each}
</PageSection>
