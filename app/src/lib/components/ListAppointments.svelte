<script lang="ts">
    import { inquiryCount, today, todayLabel, typeColor, upcomingDays, waitingInquiries } from "../utils/sample-data"
    let { type } = $props();
</script>

<section class="section" aria-labelledby="today">
    <div class="section-header">
        <h2 id="today" class="ds-heading" data-size="sm">I dag</h2>
        <a
            class="ds-link"
            href="/calendar"
            data-size="sm"
            data-color="accent"
        >
            Åpne kalender
        </a>
    </div>
    {#each today as appointment (appointment.start)}
        <article class="ds-card" data-color="neutral">
            <div class="appointment-card">
            <div class="appointment-time">
                <span class="appointment-time-start">{appointment.start}</span>
                <span class="appointment-time-end">til {appointment.end}</span>
            </div>
            <div class="appointment-details">
                <span class="appointment-client">{appointment.client}</span>
                <span class="appointment-note">{appointment.note}</span>
            </div>
            <span class="ds-tag" data-size="sm" data-color={typeColor[appointment.type]}>{appointment.type}</span>
            </div>
        </article>
    {/each}
</section>